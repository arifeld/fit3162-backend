const logger = require("./../logging/logging");
const mysql = require('mysql2')

const fs = require("fs");
const { setOwner } = require("./owner");
const { setBusiness } = require("./business");
const { setUser } = require("./user");

const connectDatabase = function() {
    logger.info("Attempting to connect to database.");

    const database = mysql.createConnection({
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASS,
      });
      
      database.connect(function(err) {
        if (err) {
          logger.error("Error connecting to database.");
          logger.error(err.stack);
          process.exit(1);
        }
      
        logger.info(`Connected to database with thread ID: ${database.threadId}`);
      
        database.query(`CREATE DATABASE IF NOT EXISTS ${process.env.MYSQL_DB};`, function(err, _) {
          if (err) throw err;
        });
      
        
        // Navigate to the reviewdb database, if it exists.
        database.changeUser({ database: process.env.MYSQL_DB }, function(err) {
      
          database.query(`SELECT table_name FROM information_schema.tables WHERE table_schema ='${process.env.MYSQL_DB}'`, function(err, tables) {
            if (err) throw err;
            if (tables.length == 0) {
              logger.warn("----------------------------------------------------------------------------------------------");
              logger.warn("DATABASE HAS NOT BEEN SETUP.");
              logger.warn(`The database, ${process.env.MYSQL_DB}, has now been created. You will need to load the bootstrap file to setup the schema.`);
              logger.warn("Refer to the README for instructions.");
              logger.warn("----------------------------------------------------------------------------------------------");   
            }
          })
      
          if (err) {
            logger.error("Failed to switch to intended database.")
            logger.error(err)
          
            return;
          }
      
          logger.info(`Successfully connected to ${process.env.MYSQL_DB} table.`);

          // Check if we should import data from the bootstrap file
          if (process.argv[2] == "import-data") {
            bootstrapData(database);
          }
        })
      })

    return database;

}

const bootstrapData = function(db) {
  console.log("Running data bootstrap script.")
  const data = JSON.parse(fs.readFileSync("src/bootstrap/clayton-output.json"));


  // Insert test user
  setUser(db, "test@student.monash.edu", "test", "test", () => {});
  
  //db.execute(`INSERT INTO user VALUES (?, ?, ?, ?)`, [1, "test@test.com", "test", "test"]);
  
  setOwner(db, 1, "business@monash.edu", "test", (result) => {
    setBusiness(db, "Gio's Store", "business@monash.edu", "0412345678", 1, (_) => {
      db.execute(`UPDATE store SET business_id=? WHERE store_id=?`, [1, 1]);
      db.execute(`UPDATE store SET business_id=? WHERE store_id=?`, [1, 4]);
      db.execute(`UPDATE store SET business_id=? WHERE store_id=?`, [1, 8]);
    })
  })

  
  // Need to first generate a set of all categories so we don't throw errors due to async executes
  const categorySet = new Set();

  for (const store of data) {
    for (const category of store["categories"]) {
      categorySet.add(category);  
    }
  }

  for (const category of categorySet) {
    db.execute(`INSERT INTO category (category_name) VALUES (?)`, [category], (err, res) => {
      if (err) { logger.error(err); return; }
      logger.info(`Created new category=${category} with id=${res.insertId}`);
    })
  }




  for (const store of data) {
    // Import the initial store data
    db.execute(`
      INSERT INTO store (store_name, store_description, store_address_street, store_address_suburb, store_address_postcode, store_geopoint, store_contact_phone, store_contact_email, store_contact_website, store_file_name) 
      VALUES 
      (?, ?, ?, ?, ?, POINT(?, ?), ?, ?, ?, ?);
    `, 
      [
        store.store_name,
        store.store_description,
        store.store_address_street,
        store.store_address_suburb,
        store.store_address_postcode,
        store.store_geopoint['x'],
        store.store_geopoint['y'],
        store.store_contact_phone,
        store.store_contact_email,
        store.store_contact_website,
        store.store_file_name
      ], (err, res_store_insert) => {
        if (err) { logger.error(err); return; }

        // For each category, see if the category already exists in the database.
        // If not, create the entity first
        for (const category of store["categories"]) {
          db.execute(`SELECT category_id FROM category WHERE category_name=?`, [category], (err, res_select) => {
            if (err) { logger.error(err); return; }
            if (res_select.length == 0) {
              logger.error(`Category is missing from database: ${category}`)
            } else {
              linkStoreCategory(db, res_store_insert.insertId, res_select[0].category_id)
            }
          })
        }

        logger.info(`Inserted store=${store.store_name} with ID=${res_store_insert.insertId}`);
      })
  }

  db.execute
}

const linkStoreCategory = function(db, store_id, category_id) {
  db.execute(`INSERT INTO store_category (store_id, category_id) VALUES (?, ?)`, [store_id, category_id], (err, res) => {
    if (err) { logger.error(err); return;}
    logger.info(`Created store_category row with store_id=${store_id} and category_id=${category_id}`);
  })
}


module.exports = {connectDatabase, bootstrapData};