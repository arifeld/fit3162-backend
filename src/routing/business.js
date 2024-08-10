const express = require("express");
const router = express.Router();
const dbConnection = require('../db/connection'); 
const mysql = require('mysql2');
const database = dbConnection();

router.get("/", (req, res) => {
    const data = {
        "store_id": 1,
        "store_name": "Guzman y Gomez",
        "store_address": "21 Chancellors Walk, Clayton VIC 3800",
        "store_categories": [
            "Mexican",
            "Fast Food",
        ]
    };

    res.json(data);
});


router.get("/:id", (req, res) => {
    const data = {
        "store_id": req.params.id,
        "store_name": "Guzman y Gomez",
        "store_address": "21 Chancellors Walk, Clayton VIC 3800",
        "contact_info": "0399881409",
        "business_id": 1,
        "store_categories": [
            "Mexican",
            "Fast Food",
        ]
    };

    res.json(data);
});

// a query to test updating the database:
router.post("/", (req, res) => {
    const {store_id, store_name, store_address, business_id, contact_info} = req.body;

    const sqlScript = `INSERT INTO store (store_id, store_name, store_address, business_id, contact_info)
                            VALUES(?,?,?,?,?)`;

    
    
    database.query(sqlScript, [store_id, store_name, store_address, contact_info, business_id, store_address], (err, result) => {
        if(err){
            console.log(err);
            return res.status(500).send('Fuck');
        }
        return res.status(201).send('Entry added to the bussiness');
    });
});

module.exports = router;