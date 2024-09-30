const express = require("express");
const router = express.Router();

const { getStore, getAllStores, getStoresByStoreName, getStoresByBusinessId} = require("../db/store");

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

router.get('/name', (req, res) => {
    db = req.app.get("db");

    getAllStores(db, 1, 100, function(rows) {
        res.json(rows);
    });
    
})


router.get('/name/:name', (req, res) => {
    db = req.app.get("db");

    if (!req.params.name.trim()) {
        getAllStores(db, 0, 100, function(rows) {
            res.json(rows);
        });
    } else {
        getStoresByStoreName(db, req.params.name, function(rows){
            console.log(rows)
            res.json(rows);
        });
    }

    
})

router.get('/business/:business_id', (req, res) => {
    const db = req.app.get("db");  // Properly declare db

    getStoresByBusinessId(db, req.params.business_id, function(rows) {
        if (rows) {
            res.json(rows);  // Send the data back as a JSON response
        } else {
            res.status(404).json({ message: 'No stores found for this business' });  // Handle the case where no rows are returned
        }
    });
});

module.exports = router;

