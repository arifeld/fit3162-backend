const express = require('express');
const router = express.Router();
const dbConnection = require('../db/connection'); 
const mysql = require('mysql2');

// constructing endpoints to get the user

router.get('/', (req, res) => {
    const data = {
        "user_id": 1,
        "user_email": "test@student.monash.edu",
        "user_password": "test123",
        "user_username":"Suryadeep"

    };
    res.json(data);
} );

router.get('/:id', (req, res) => {
    const data = {
        "user_id": req.params.id,
        "user_email": "test@student.monash.edu",
        "user_password": "test123",
        "user_username":"Suryadeep"

    };
    res.json(data);
})

module.exports = router;
