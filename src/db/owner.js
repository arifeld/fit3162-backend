const { get } = require("../routing/user");
const logger = require("./../logging/logging");
const bcrypt = require('bcrypt');


const setOwner = function(db, owner_id, owner_email, owner_password, callback) {
    // Hash the password here:
    bcrypt.hash(owner_password, 10, (error, hashpassword) => {
        if (error) {
            console.log("Error hashing password", error);
            return;
        }

        // SQL query to insert the owner into the database
        const setBusinessScript = `INSERT INTO Owner (owner_id, owner_email, owner_password) VALUES (?, ?, ?)`;

        // Use the hashed password instead of the plain text password
        const callback_values = [owner_id, owner_email, hashpassword];

        // Executing the query
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
    });
};

const loginOwner = function(db, owner_email, owner_password, callback){
    const getOwnerScript = `SELECT * FROM owner WHERE owner_email = ?`;

    db.execute(getOwnerScript, [owner_email], (err, result) => {
        if (err) {
            console.log("Problem with querying user", err);
            if (callback) {
                callback(null);
                return;
            }
        } 

        if (result.length == 0){
            if (callback){
                callback(null);
                return;
            }
        }

        const owner = result[0];

        bcrypt.compare(owner_password, owner.owner_password, (err, isMatch) => {
            if (err) {
                console.log("Error comparing passwords", err);
                if (callback) callback(null);
                return;
            }

            if (isMatch) {
                // Passwords match
                if (callback) callback({ owner_id: owner.owner_id, owner_email: owner.owner_email });
            } else {
                // Passwords do not match
                if (callback) 
                    callback(null);
            }
        });
    })
}

const getBusinessByOwnerID = function(db, owner_id, callback){
    console.log(owner_id);
    const getBusinessByOwnerIDScript = `SELECT * FROM business WHERE owner_id = ?`;

    db.execute(getBusinessByOwnerIDScript, [owner_id], (err, result) => {
        if (err) { 
            logger.error(err); 
            return; 
        }
        if (callback) { 
            console.log(result);
            callback(result); 
        }
    })
};

const getOwnerIdByEmail = function(db, owner_email, callback){
    const getOwnerIdByEmailScript = `SELECT owner_id FROM owner WHERE owner_email = ?`;

    db.execute(getOwnerIdByEmailScript, [owner_email], (err, result) => {
        if (err) { 
            logger.error(err); 
            return; 
        }
        if (callback) { 
            console.log(result);
            callback(result); 
        }
    })
};

module.exports = {setOwner, loginOwner, getBusinessByOwnerID, getOwnerIdByEmail};