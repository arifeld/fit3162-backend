const express = require('express');
const router = express.Router();
const { setUser, loginUser, getUserIdFromEmail, getUserNameFromId, updateUserName} = require("../db/user");


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

router.get('/email/:user_email', (req, res) => {
    const { user_email } = req.params; // Use req.query instead of req.body

    // Logging the incoming values to ensure they're valid
    console.log('Request Query:', req.params);

    if (!user_email) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const db = req.app.get("db");

    getUserIdFromEmail(db, user_email, function(result) {
        if (result) {
            res.status(201).json({ message: 'user_id retrieved successfully', result });
        } else {
             res.status(500).json({ error: 'Failed to retrieve user id' });
        }
    });
});

router.get('/name/:user_id', (req, res) => {
    const { user_id } = req.params; // Use req.query instead of req.body

    // Logging the incoming values to ensure they're valid
    console.log('Request Query:', req.params);

    if (!user_id) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const db = req.app.get("db");

    getUserNameFromId(db, user_id, function(result) {
        if (result) {
            res.status(201).json({ message: 'user_id retrieved successfully', result });
        } else {
             res.status(500).json({ error: 'Failed to retrieve user id' });
        }
    });
});

router.post('/login', (req, res) => {
    const { user_email, user_password} = req.body;

    // Logging the incoming values to ensure they're valid
    console.log('Request Body:', req.body);

    // Check if the necessary fields are present
    if (!user_email || !user_password) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const db = req.app.get("db");

    // Call setUser without the user_id, as it's auto-incremented
    loginUser(db, user_email, user_password, function(result) {
        if (result) {
            res.status(201).json({ message: 'User signed in successfully', result });
        } else {
            res.status(401).json({ error: 'Incorrect User Authentication' });
        }
    });
})

//update the user name 
router.put('/:user_id', (req, res) => {
    const { user_id } = req.params;
    const { user_username } = req.body;

    // Logging the incoming values to ensure they're valid
    console.log('Request Body:', req.body);

    // Check if the necessary fields are present
    if (!user_id || !user_username) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const db = req.app.get("db");

    // Call setUser without the user_id, as it's auto-incremented
    updateUserName(db, user_id, user_username, function(result) {
        if (result) {
            res.status(201).json({ message: 'User name updated successfully', result });
        } else {
            res.status(500).json({ error: 'Failed to update user name' });
        }
    });
});

module.exports = router;
