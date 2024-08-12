const express = require("express");
const router = express.Router();
const dbConnection = require('../db/connection'); 
const mysql = require('mysql2');
const database = dbConnection();

router.get("/", (req, res) => {
    const data = {
        "category_id": 1,
        "category_name": "Mexican",
        "category_description": "Mexican food"
    };

    res.json(data);
});

router.get('/:id', (req, res) => {
    const data = {
        "category_id": req.params.id,
        "category_name": "Mexican",
        "category_description": "Mexican food"
    };
    res.json(data);
});

module.exports = router;