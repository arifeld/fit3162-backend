const logger = require("./../logging/logging");

const getBusiness = function(db, business_id, callback){

}

const setBusiness = function(db, business_id, business_name, business_contact_email, business_contact_phone, owner_id, callback){

    // we will need to create a query that creates a business:
    const setBusinessScript = `
        INSERT INTO business (business_id, business_name, business_contact_email, business_contact_phone, owner_id) 
        VALUES (?, ?, ?, ?, ?)`;

    const callback_values = [business_id, business_name, business_contact_email, business_contact_phone, owner_id];

    db.execute(setBusinessScript, callback_values, (err, result) => {
        if (err) {
            console.log("Problem with inserting business", err);
            if (callback) {
                callback(null);
            }
        } else {
            if (callback) {
                callback(result);
            }
        }
    });
}

module.exports = {setBusiness};