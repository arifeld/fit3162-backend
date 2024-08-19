const express = require("express");
const router = express.Router();
const dbConnection = require('../db/connection'); 
const mysql = require('mysql2');
const database = dbConnection();

router.get("/", (req, res) => {
    const data = {
        "store_id": 1,
        "category_id": 1,
        "category_name": "Mexican"
    };

    res.json(data);
});



module.exports = router;