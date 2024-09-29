const logger = require("./../logging/logging");
const bcrypt = require('bcrypt');

const setUser = function(db, user_email, user_password, user_username, callback) {
    // Log the incoming values to ensure they're valid
    console.log('User Email:', user_email);
    console.log('User Password:', user_password ? 'Provided' : 'Undefined');
    console.log('User Username:', user_username);

    // Check if any of the required values are undefined
    if (!user_email || !user_password || !user_username) {
        console.error('Missing required fields:', { user_email, user_password, user_username });
        return callback(null);  // Or handle the error appropriately
    }

    // Hash the password before storing it
    bcrypt.hash(user_password, 10, (error, hashpassword) => {
        if (error) {
            console.log("Error hashing password", error);
            return;
        }

        // SQL query to insert the user into the database, omitting `user_id`
        const setUserScript = `INSERT INTO User (user_email, user_password, user_username) VALUES (?, ?, ?)`;

        // Values for the query (omit `user_id`)
        const callback_values = [user_email, hashpassword, user_username];

        // Executing the query
        db.execute(setUserScript, callback_values, (err, result) => {
            if (err) {
                console.log("Problem with inserting user", err);
                if (callback) {
                    callback(null);
                }
            } else {
                if (callback) {
                    callback(result);  // Return the result
                }
            }
        });
    });
};

module.exports = { setUser };