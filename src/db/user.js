const logger = require("./../logging/logging");
const bcrypt = require('bcrypt');


const setUser = function(db, user_id, user_email, user_password, user_username, callback) {
    // Hash the password here:
    bcrypt.hash(user_password, 10, (error, hashpassword) => {
        if (error) {
            console.log("Error hashing password", error);
            return;
        }

        // SQL query to insert the owner into the database
        const setUserScript = `INSERT INTO User (user_id, user_email, user_password, user_username) VALUES (?, ?, ?, ?)`;

        // Use the hashed password instead of the plain text password
        const callback_values = [user_id, user_email, hashpassword, user_username];

        // Executing the query
        db.execute(setUserScript, callback_values, (err, result) => {
            if (err) {
                console.log("Problem with inserting user", err);
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
module.exports = {setUser};