const express = rquire('express');
const router = express.Router();


router.post('/', (req, res) => {
    db = req.app.get('db');

    const {review_id, review_date, review_rating, review_description, user_id, store_id, review_business_response} = req.body;

    const db = req.app.get("db");

    

    
})
