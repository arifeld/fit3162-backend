const logger = require("./../logging/logging");

const getAllStores = function(req, page, limit){

}

const getStore = function(db, id, callback) { 

    const getStoreQuery = `
        SELECT store.store_id, store_name, store_address_street, store_address_suburb, store_address_postcode, store_geopoint, contact_phone, contact_email, business_id, JSON_ARRAYAGG(JSON_OBJECT("name", category.category_name, "description", category.category_description)) AS categories 
        FROM store
        LEFT JOIN store_category ON store.store_id = store_category.store_id AND store.store_id = ?
        LEFT JOIN category ON store_category.category_id = category.category_id
        GROUP BY store.store_id;
    `;


    // No SQL injection vulnerability by using prepared statements
    // The query is also cached thanks to mysql2
    db.execute(getStoreQuery, [id], (err, rows) => {
        if (err) { logger.error(err); return; }

        if (callback) { callback(rows); }
    })

}

//const insertStore = 

module.exports = {getStore, getAllStores}