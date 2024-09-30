const { remove } = require("winston");
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

// one endpoint to remove favourite
const removeFavourite = function(db, user_id, store_id, callback){
    const removeFavScript = `
    DELETE FROM user_favourite WHERE user_id = ? AND store_id = ?`;

    const callback_values = [user_id, store_id];

    db.execute(removeFavScript, callback_values, (err, result) => {
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

const checkFavourite = function(db, user_id, store_id, callback) {
    const checkFavScript = `
        SELECT * FROM user_favourite 
        WHERE user_id = ? AND store_id = ?`;

    const callback_values = [user_id, store_id];

    db.execute(checkFavScript, callback_values, (err, result) => {
        if (err) {
            console.log("Problem with checking user_favourite", err);
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

const getFavouriteStores = function(db, user_id, callback){
    const getFavouriteScript = `SELECT store.* FROM user_favourite
    JOIN store ON user_favourite.store_id = store.store_id
    WHERE user_favourite.user_id = ?`

    const callback_values = [user_id];

    db.execute(getFavouriteScript, callback_values, (err, result) => {
        if (err) {
            console.log("Problem with getting user_favourite", err);
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


module.exports = { addFavourite, removeFavourite, checkFavourite, getFavouriteStores};

