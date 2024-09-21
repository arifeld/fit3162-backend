const express = require('express');
const router = express.Router();
const {setReview, getReviewbyStore} = require('../db/review');


router.post('/', (req, res) => {

    const {review_date, review_rating, review_description, user_id, store_id, review_business_response} = req.body;

    const db = req.app.get("db");

    setReview(db, review_date, review_rating, review_description, user_id, store_id, review_business_response, function(results){
            console.log(res.json(results));
    
    });


});

router.get('/:id', (req, res) => {
    const db = req.app.get("db");

    // Add logging to debug
    console.log("Fetching reviews for store ID:", req.params.id);

    getReviewbyStore(db, req.params.id, function(result) {
        if (result) {
            console.log("Result received from DB:", result); // Log the result

            // Send the result back to ThunderClient as JSON
            res.status(200).json(result);
        } else {
            console.log("No result received");
            // Send a 404 if no result was found
            res.status(404).json({ message: "No reviews found for this store" });
        }
    });
});

module.exports = router;
