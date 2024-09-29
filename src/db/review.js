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

const setReview = function(db, review_date, review_rating ,review_description, user_id, store_id, recommended, callback){

    // we will need to create a query that creates a business:
    const setReviewScript = `INSERT INTO review ( review_date, review_rating ,review_description, user_id, store_id, review_recommended) 
        VALUES (?, ?, ?, ?, ?, ?)`;

    const callback_values = [review_date, review_rating ,review_description, user_id, store_id, recommended];

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

/**
 * Utility method to get average review for store
 * @param {*} db 
 * @param {*} store_id 
 */
// const getAverageReviewForStore = function(db, store_id) {
//     const getAllRatingsStatement = `SELECT COUNT(*) AS total_reviews, COUNT(review_rating) AS combined_amount FROM rating WHERE store_id=?`;

//     try {
//         const [rows, fields] = db.execute(getAllRatingsStatement, [store_id]);
//         console.log(rows);
//     } catch (err) {
//         console.error(err);
//     }

    


// }

module.exports = {setReview, getReviewbyStore, getAverageReviewForStore};