const logger = require("./../logging/logging");

const setReview = function(db, review_id, review_date, review_rating ,review_description, user_id, store_id, review_business_response, callback){

    // we will need to create a query that creates a business:
    const setReviewScript = `
        INSERT INTO review (review_id, review_date, review_rating ,review_description, user_id, store_id, review_business_response) 
        VALUES (?, ?, ?, ?, ?, ?, ?)`;

    const callback_values = [review_id, review_date, review_rating ,review_description, user_id, store_id, review_business_response];

    db.execute(setBusinessScript, callback_values, (err, result) => {
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
}

module.exports(setReviewScript);