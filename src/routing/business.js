const express = require("express");
const router = express.Router();
const { setBusiness } = require("../db/business");

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

// a query to test updating the database:
router.post("/", (req, res) => {
    // call the db:
    db = req.app.get("db");

    const {business_id, business_name, business_contact_email, business_contact_phone, owner_id} = req.body;
    // we will call the setBusiness function here:
    
    setBusiness(db, business_id, business_name, business_contact_email, business_contact_phone, owner_id, function(result){
        console.log(res.json(result));
    });


    
});

module.exports = router;