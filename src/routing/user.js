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
});

router.post('/', (req, res) => {
    const { user_email, user_password, user_username } = req.body;

    const sqlScript = `INSERT INTO user (user_id, user_email, user_password, user_username) VALUES (?, ?, ?, ?)`;
    
    database.query(sqlScript, [user_id, user_email, user_password, user_username], (err, result) => {
        if (err) {
            console.error("Error inserting data:", err);
            return res.status(500).json({ error: "Failed to create user" });
        }
        res.status(201).json({ message: "User created successfully", userId: result.insertId});
    });
});


module.exports = router;
