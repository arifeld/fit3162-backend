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
        "business_id": 1,
        "contact_info": "0399881409"
    };

    res.json(data);
});

router.get('/:id', (req, res) => {
    const data = {
        "store_id": req.params.id,
        "store_name": "Guzman y Gomez",
        "store_address": "21 Chancellors Walk, Clayton VIC 3800",
        "business_id": 1,
        "contact_info": "0399881409"

    };
    res.json(data);
});

module.exports = router;

