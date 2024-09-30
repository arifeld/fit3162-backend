const express = require('express');
const router = express.Router();
const {addFavourite, removeFavourite, checkFavourite, getFavouriteStores} = require('../db/user_favourites');
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

router.get('/:user_id', (req, res) => {
    const { user_id } = req.params;
    const db = req.app.get("db");

    getFavouriteStores(db, user_id, function(results) {
        if (results && results.length > 0) {
            res.json(results); // Return all the favourite stores
        } else {
            res.json({ message: 'No favourite stores found for this user.' });
        }
    });
});


module.exports = router;