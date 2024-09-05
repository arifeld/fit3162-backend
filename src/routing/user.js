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
    const { user_id, user_email, user_password, user_username } = req.body;

    
    const db = req.app.get("db");

    setUser(db, user_id, user_email, user_password, user_username, function(result){
        console.log(res.json(result));

    
});
});

module.exports = router;
