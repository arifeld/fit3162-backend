const express = require("express");
const router = express.Router();
const { getBusiness, setBusiness, deleteBusiness } = require("../db/business");

router.get("/:id", (req, res) => {
    const db = req.app.get("db");
    const business_id = req.params.id;

    getBusiness(db, business_id, function(rows) {
        res.json(rows[0]);
    });
});


// a query to test updating the database:
router.post("/", (req, res) => {
    // call the db:
    const db = req.app.get("db");

    const {business_name, business_contact_email, business_contact_phone, owner_id} = req.body;

    setBusiness(db, business_name, business_contact_email, business_contact_phone, owner_id, (result) => {
        if (result) {
            res.status(201).json({message: "Business created successfully."});
        }
        else {
            res.status(500).json({message: "Failed to create business."})
        }
    });
    
});

router.delete("/:id", (req, res) => {
    const db = req.app.get("db");

    const business_id = req.params.id;

    deleteBusiness(db, business_id, (result) => {
        if (result) {
            if (result.affectedRows === 0) {
                res.status(404).json({message: "Business not found."});
            }
            res.status(201).json({message: "Business successfully deleted."});
        }
        else {
            res.status(500).json({message: "Failed to delete business"})
        }
    });
});

module.exports = router;