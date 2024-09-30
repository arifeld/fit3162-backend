const express = require("express");
const router = express.Router();
const { setOwner, loginOwner } = require("../db/owner");

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

module.exports = router;