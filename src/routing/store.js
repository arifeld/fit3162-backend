const express = require("express");
const router = express.Router();

const { getStore, getAllStores, getStoreByStoreName } = require("../db/store");

router.get("/", (req, res) => {
    db = req.app.get("db");

    const rawPage = req.query.page ?? "1";
    const rawLimit = req.query.limit ?? "20";

    const page = parseInt(rawPage);
    const limit = parseInt(rawLimit);

    if (!Number.isInteger(page) || !Number.isInteger(limit)) { 
        res.send("Invalid parameters, page and limit must both be omitted or integers");
        return;
    }

    getAllStores(db, page, limit, function(rows) {
        res.json(rows);
    });
});

router.get('/id/:id', (req, res) => {

    // We will inject the database dependency so that we can setup a mock database later for testing.
    db = req.app.get("db");
    const storeId = req.params.id;
    console.log("Store ID from params:", storeId);

    // getStore takes a callback function which defines what happens once we get the result.
    getStore(db, req.params.id, function(rows) {
        res.json(rows);
    });
});

router.get('/name/:name', (req, res) => {
    db = req.app.get("db");

    getStoreByStoreName(db, req.params.name, function(rows){
        res.json(rows);
    });
})

module.exports = router;

