const logger = require("./../logging/logging");


const setOwner = function(db, owner_id, owner_email, owner_password, callback){

    // we will need to create a query that creates a business:
    const setBusinessScript = `
        INSERT INTO Owner (owner_id, owner_email, owner_password) 
        VALUES (?, ?, ?)`;

    const callback_values = [owner_id, owner_email, owner_password];

    db.execute(setBusinessScript, callback_values, (err, result) => {
        if (err) {
            console.log("Problem with inserting owner", err);
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

module.exports = {setOwner};