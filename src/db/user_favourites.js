const logger = require("./../logging/logging");

const addFavourite = function(db, user_id, store_id, callback){

    // we will need to create a query that creates a business:
    const setFavScript = `
        INSERT INTO user_favourite (user_id, store_id) 
        VALUES (?, ?)`;

    const callback_values = [user_id, store_id];

    db.execute(setFavScript, callback_values, (err, result) => {
        if (err) {
            console.log("Problem with inserting user_favourite", err);
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

module.exports = { addFavourite };

