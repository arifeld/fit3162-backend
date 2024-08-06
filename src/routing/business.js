const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    const data = {
        "store_id": 1,
        "store_name": "Guzman y Gomez",
        "store_address": "21 Chancellors Walk, Clayton VIC 3800",
        "store_categories": [
            "Mexican",
            "Fast Food",
        ]
    };

    res.json(data);
});

router.get("/:id", (req, res) => {
    const data = {
        "store_id": req.params.id,
        "store_name": "Guzman y Gomez",
        "store_address": "21 Chancellors Walk, Clayton VIC 3800",
        "contact_info": "0399881409",
        "business_id": 1,
        "store_categories": [
            "Mexican",
            "Fast Food",
        ]
    };

    res.json(data);
});

module.exports = router;