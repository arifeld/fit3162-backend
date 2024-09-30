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

const getUserIdFromEmail = function(db, user_email, callback) {
    const getUserIdScript = `SELECT user_id FROM USER WHERE user_email = ?`;

    console.log('User Email:', user_email);

    db.execute(getUserIdScript, [user_email], (err, result) => {
        if (err) {
            console.log("Problem with getting user id", err);
            // Call the callback with null to indicate failure
            return callback(null);
        }

        console.log('Result:', result);

        // Check if a user was found
        if (result.length === 0) {
            // No user found, call the callback with null
            return callback(null);
        }

        // User found, call the callback with the user ID
        return callback(result[0].user_id);
    });
};

const getUserNameFromId = function(db, user_id, callback) {
    const getUserNameScript = `SELECT user_username FROM USER WHERE user_id = ?`;

    console.log('User ID:', user_id);

    db.execute(getUserNameScript, [user_id], (err, result) => {
        if (err) {
            console.log("Problem with getting user name", err);
            // Call the callback with null to indicate failure
            return callback(null);
        }

        console.log('Result:', result);

        // Check if a user was found
        if (result.length === 0) {
            // No user found, call the callback with null
            return callback(null);
        }

        // User found, call the callback with the user ID
        return callback(result[0].user_username);
    });
}

const loginUser = function(db, user_email, user_password, callback){
    const getUserScript = `SELECT * FROM USER WHERE user_email = ?`;

    db.execute(getUserScript, [user_email], (err, result) => {
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

        const user = result[0];

        bcrypt.compare(user_password, user.user_password, (err, isMatch) => {
            if (err) {
                console.log("Error comparing passwords", err);
                if (callback) callback(null);
                return;
            }

            if (isMatch) {
                // Passwords match
                if (callback) callback({ user_id: user.user_id, user_email: user.user_email });
            } else {
                // Passwords do not match
                if (callback) 
                    callback(null);
            }
        });
    })
}

//update the user name
const updateUserName = function(db, user_id, user_username, callback) {
    // Log the incoming values to ensure they're valid
    console.log('User ID:', user_id);
    console.log('User Username:', user_username);

    // Check if any of the required values are undefined
    if (!user_id || !user_username) {
        console.error('Missing required fields:', { user_id, user_username });
        return callback(null);  // Or handle the error appropriately
    }

    // SQL query to update the user's username
    const updateUserNameScript = `UPDATE user SET user_username = ? WHERE user_id = ?`;

    // Values for the query
    const callback_values = [user_username, user_id];

    // Executing the query
    db.execute(updateUserNameScript, callback_values, (err, result) => {
        if (err) {
            console.log("Problem with updating user name", err);
            if (callback) {
                callback(null);
            }
        } else {
            if (callback) {
                callback(result);  // Return the result
            }
        }
    });
};

module.exports = { setUser, loginUser, getUserIdFromEmail, getUserNameFromId, updateUserName};