const express = require("express");
const router = express.Router();
const { getBusiness, setBusiness, deleteBusiness } = require("../db/business");

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
router.post("/", async (req, res) => {
    // call the db:
    const db = req.app.get("db");

    const {business_name, business_contact_email, business_contact_phone, owner_id} = req.body;
    // we will call the setBusiness function here:
    try {
        const result = await setBusiness(db, business_name, business_contact_email, business_contact_phone, owner_id);

        if (!result) {
            return res.status(400).json({error: "Failed to create business"});
        }

        return res.status(201).json({message: "Business successfully created"});
    }
    catch (err) {
        return res.status(500).json({error: "Failed to create business", details: err.message});
    }
});

router.delete("/:id", async (req, res) => {
    const db = req.app.get("db");

    const business_id = req.params.id;

    try {
        const result = await deleteBusiness(db, business_id);

        if (!result) {
            return res.status(400).json({error: "Failed to delete business"});
        }

        return res.status(200).json({message: "Business successfully deleted"});
    }
    catch (err) {
        return res.status(500).json({error: "Failed to delete business", details: err.message});
    }
})

module.exports = router;