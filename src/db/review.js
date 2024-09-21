const logger = require("./../logging/logging");

const getReviewbyStore = function(db, store_id, callback) {
    const getReviewByStoreIdScript = `SELECT r.*, u.user_username FROM review r 
                                        LEFT JOIN user u
                                        ON r.user_id = u.user_id  
                                        WHERE r.store_id = ?  `;
    
    // Execute the query and handle error/result
    db.execute(getReviewByStoreIdScript, [store_id], (err, result) => {
        if (err) {
            console.error("Database Error:", err); // Log the error
            callback(null, err); // Pass error to the callback
            return; // Exit if there's an error
        }

        callback(result); // Pass result to the callback
    });
};

const setReview = function(db, review_date, review_rating ,review_description, user_id, store_id, review_business_response, callback){

    // we will need to create a query that creates a business:
    const setReviewScript = `INSERT INTO review ( review_date, review_rating ,review_description, user_id, store_id, review_business_response) 
        VALUES (?, ?, ?, ?, ?, ?)`;

    const callback_values = [review_date, review_rating ,review_description, user_id, store_id, review_business_response];

    db.execute(setReviewScript, callback_values, (err, result) => {
        if (err) {
            console.log("Problem with inserting review", err);
            if (callback) {
                callback(null);
            }
        } else {
            if (callback) {
                callback(result);
            }
        }
    });
};

module.exports = {setReview, getReviewbyStore};