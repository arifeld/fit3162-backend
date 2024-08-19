const express = require("express");
const router = express.Router();
const { setOwner } = require("../db/owner");

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
    const {owner_id, owner_email, owner_password} = req.body;

    const db = req.app.get("db");

    setOwner(db, owner_id, owner_email, owner_password, function(result){
        console.log(res.json(result));

});

});

module.exports = router;