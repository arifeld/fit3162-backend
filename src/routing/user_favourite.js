const express = require('express');
const router = express.Router();
const {addFavourite, removeFavourite, checkFavourite} = require('../db/user_favourites');
const { remove } = require('winston');

router.post('/', (req, res) => {

    const {user_id, store_id} = req.body;

    const db = req.app.get("db");

    addFavourite(db, user_id, store_id, function(results){
        console.log("done");
        res.json(results);
    });

});

router.post('/remove', (req, res) => {
    const {user_id, store_id} = req.body;

    const db = req.app.get("db");

    removeFavourite(db, user_id, store_id, function(results){
        console.log("removed");
        res.json(results);
    });
});

router.get('/:user_id/:store_id', (req, res) => {
    const { user_id, store_id } = req.params;

    const db = req.app.get("db");

    checkFavourite(db, user_id, store_id, function(results) {
        if (results && results.length > 0) {
            res.json({ isFavorite: true });
        } else {
            res.json({ isFavorite: false });
        }
    });
});


module.exports = router;