const express = require("express");
const router = express.Router();
const { getBusiness, setBusiness } = require("../db/business");

router.get("/:id", async (req, res) => {
    const db = req.app.get("db");
    const business_id = req.params.id;

    try {
        const business = await getBusiness(db, business_id);

        if (!business || business.length === 0) {
            return res.status(404).json({error: "Business not found"});
        }

        return res.status(200).json(business);
    }
    catch (err) {
        res.status(500).json({error: "Failed to retrieve business with id", details: err.message});
    }

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