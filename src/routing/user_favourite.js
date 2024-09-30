const express = require('express');
const router = express.Router();
const {addFavourite} = require('../db/user_favourites');

router.post('/', (req, res) => {

    const {user_id, store_id} = req.body;

    const db = req.app.get("db");

    addFavourite(db, user_id, store_id, function(results){
        console.log("done");
        res.json(results);
    });

});

module.exports = router;