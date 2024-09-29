const express = require('express');
const router = express.Router();
const { setUser } = require("../db/user");


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

    // Logging the incoming values to ensure they're valid
    console.log('Request Body:', req.body);

    // Check if the necessary fields are present
    if (!user_email || !user_password || !user_username) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const db = req.app.get("db");

    // Call setUser without the user_id, as it's auto-incremented
    setUser(db, user_email, user_password, user_username, function(result) {
        if (result) {
            res.status(201).json({ message: 'User created successfully', result });
        } else {
            res.status(500).json({ error: 'Failed to create user' });
        }
    });
});

module.exports = router;
