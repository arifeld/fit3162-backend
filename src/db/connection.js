const logger = require("./../logging/logging");
const mysql = require('mysql2')



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
        })
      })

    return database;

}



module.exports = connectDatabase;