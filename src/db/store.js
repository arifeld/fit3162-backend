const logger = require("./../logging/logging");

const getAllStores = function(db, page, limit, callback) {

    if (typeof page != "number")  { logger.error(`Provided page value: ${page} is not a number`); return; }
    if (typeof limit != "number") { logger.error(`Provided limit value: ${limit} is not a number`); return; }
    
    const offset = (page-1) * limit;

    if (!Number.isInteger(offset)) { logger.error(`Offset is not an integer: ${offset}`); return; }

    // Will need to expand this query and sort by distance
    const getAllStoresQuery = `
        SELECT store_id, store_name, store_description FROM store
        LIMIT ?
        OFFSET ?
    `

    // For some reason execute requires strings, even though these should be numbers.
    db.execute(getAllStoresQuery, [limit.toString(), offset.toString()], (err, rows) => {
        if (err) { logger.error(err); return; }
        if (callback) { callback(rows); }
    })

}

const getStore = function(db, id, callback) { 

    const getStoreQuery = `
        SELECT store.store_id, store_name, store_description, store_address_street, store_address_suburb, store_address_postcode, store_geopoint, store_contact_phone, store_contact_email, store_contact_website, business_id, JSON_ARRAYAGG(JSON_OBJECT("name", category.category_name, "description", category.category_description)) AS categories 
        FROM store
        LEFT JOIN store_category ON store.store_id = store_category.store_id
        LEFT JOIN category ON store_category.category_id = category.category_id
        WHERE store.store_id = ?
        GROUP BY store.store_id;
    `;

    // No SQL injection vulnerability by using prepared statements
    // The query is also cached thanks to mysql2
    db.execute(getStoreQuery, [id], (err, rows) => {
        if (err) { logger.error(err); return; }
        if (callback) { 
            callback(rows); 
        }
    })

}

const getStoreByStoreName = function(db, store_name, callback) {
    const getStoreQuery =  `SELECT store.store_id, store_name, store_description, store_address_street, store_address_suburb, store_address_postcode, store_geopoint, store_contact_phone, store_contact_email, store_contact_website, business_id, JSON_ARRAYAGG(JSON_OBJECT("name", category.category_name, "description", category.category_description)) AS categories 
        FROM store
        LEFT JOIN store_category ON store.store_id = store_category.store_id
        LEFT JOIN category ON store_category.category_id = category.category_id
        WHERE store.store_name LIKE ?
        GROUP BY store.store_id;
    `;

    db.execute(getStoreQuery, [store_name], (err, rows) => {
        if (err) { logger.error(err); return; }
        if (callback) { 
            callback(rows); 
        }
    })
}


module.exports = {getStore, getAllStores, getStoreByStoreName}