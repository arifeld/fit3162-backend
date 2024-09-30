const express = require('express');
const router = express.Router();
const {setReview, getReviewbyStore, addReply} = require('../db/review');
const path = require("path");
const fs = require("fs");

const multer = require("multer");
const upload = multer({ dest: path.join(__dirname, "../../public/review"), limits: { fieldSize: 25 * 1024 * 1024 } })

const uploadFields = [{name: "image", maxCount: 1}];

// This is a multipart/form-data request to handle the image 
router.post('/', upload.none(), (req, res) => {

    console.log(req.body);

    const {review_rating, review_description, user_id, store_id, review_recommended, files} = req.body;

    const db = req.app.get("db");

    // Store all the files
    const fileNames = [];

    for (const i in files) {
        const imageData = files[i];
        const fileName = `${(new Date().getTime()/1000|0)}-${i}.jpeg`;
        const imagePath = path.join(__dirname, "../../public/review/") + fileName;
        fs.writeFileSync(imagePath, imageData, { encoding: "base64" });

        fileNames.push(fileName);
    }

    setReview(db, review_rating, review_description, user_id, store_id, review_recommended, fileNames, function(results){
        console.log("done");
        res.json(results);
    });

});

router.post("/reply/:id", (req, res) => {
    const db = req.app.get("db");

    const review_id = req.params.id;
    const { business_id, review_description } = req.body;

    addReply(db, review_id, business_id, review_description, function(result) {
        if (result) {
            res.json(result);
        } else {
            res.status(404).json({message: "Unable to find review"});
        }
    })


})

router.get('/:id', (req, res) => {
    const db = req.app.get("db");

    // Add logging to debug
    console.log("Fetching reviews for store ID:", req.params.id);

    getReviewbyStore(db, req.params.id, function(result) {
        if (result) {
            //console.log("Result received from DB:", result); // Log the result
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
