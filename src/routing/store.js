const express = require("express");
const router = express.Router();

const { getStore } = require("../db/store");

router.get("/", (req, res) => {
    const data = {
        "store_id": 1,
        "store_name": "Guzman y Gomez",
        "store_address": "21 Chancellors Walk, Clayton VIC 3800",
        "business_id": 1,
        "contact_info": "0399881409"
    };

    res.json(data);
});

router.get('/:id', (req, res) => {

    // We will inject the database dependency so that we can setup a mock database later for testing.
    db = req.app.get("db");

    // getStore takes a callback function which defines what happens once we get the result.
    getStore(db, req.params.id, function(rows) {
        res.json(rows);
    });

});

module.exports = router;

