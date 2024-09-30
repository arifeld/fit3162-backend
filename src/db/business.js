const logger = require("./../logging/logging");

const getBusiness = function(db, business_id, callback){

    const getBusinessScript = `SELECT * FROM BUSINESS
                                WHERE business_id = ?`;
    
    db.execute(getBusinessScript, [business_id], (err, result) => {
        if (err) { 
            logger.error(err); 
            return; 
        }
        if (callback) { 
            callback(result); 
        }
    })
};

const setBusiness = function(db, business_name, business_contact_email, business_contact_phone, owner_id, callback){

    // we will need to create a query that creates a business:
    const setBusinessScript = `
        INSERT INTO business (business_name, business_contact_email, business_contact_phone, owner_id) 
        VALUES (?, ?, ?, ?)`;

    const callback_values = [business_name, business_contact_email, business_contact_phone, owner_id];

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

const deleteBusiness = function(db, business_id, callback) {
    const deleteBusinessScript = ` DELETE FROM business WHERE business_id = ?`;

    db.execute(deleteBusinessScript, [business_id], (err, result) => {
        if (err) {
            console.log("Error deleting business", err);
            if (callback) {
                callback(null);
            }
        }
        else {
            if (callback) {
                callback(result);
            }
        }
    });
}


module.exports = {setBusiness, getBusiness, deleteBusiness};