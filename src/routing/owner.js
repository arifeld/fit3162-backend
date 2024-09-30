const express = require("express");
const router = express.Router();
const { setOwner, loginOwner, getBusinessByOwnerID, getOwnerIdByEmail } = require("../db/owner");

router.get('/business', (req, res) => {
    const owner_id = req.query.owner_id;  // Get owner_id from query parameters
    console.log(owner_id);

    if (!owner_id) {
        return res.status(400).json({ error: 'owner_id is required' });
    }

    const db = req.app.get("db");

    getBusinessByOwnerID(db, owner_id, function(rows) {
        res.json(rows);
    });
});

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

router.post("/", (req, res) => {
    const { owner_id, owner_email, owner_password } = req.body;

    const db = req.app.get("db");

    setOwner(db, owner_id, owner_email, owner_password, function (result) {
        console.log(res.json(result));

    });

});

router.post('/login', (req, res) => {
    const { owner_email, owner_password} = req.body;

    // Logging the incoming values to ensure they're valid
    console.log('Request Body:', req.body);

    // Check if the necessary fields are present
    if (!owner_email || !owner_password) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const db = req.app.get("db");

    // Call setUser without the user_id, as it's auto-incremented
    loginOwner(db, owner_email, owner_password, function(result) {
        if (result) {
            res.status(201).json({ message: 'User signed in successfully', result });
        } else {
            res.status(500).json({ error: 'Incorrect User Authentication' });
        }
    });
})

router.get('email/:owner_email', (req, res) => {
    const { owner_email } = req.params; // Use req.query instead of req.body

    // Logging the incoming values to ensure they're valid
    console.log('Request Query:', req.params);

    if (!owner_email) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const db = req.app.get("db");

    getOwnerIdByEmail(db, owner_email, function(result) {
        if (result) {
            res.status(201).json({ message: 'owner_id retrieved successfully', result });
        } else {
             res.status(500).json({ error: 'Failed to retrieve owner id' });
        }
    });
});

module.exports = router;