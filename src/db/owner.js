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
module.exports = {setOwner};