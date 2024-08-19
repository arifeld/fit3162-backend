const express = require("express");
const router = express.Router();

const mysql = require('mysql2');


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
    const {category_id, category_name, category_description} = req.body;

    const sqlScript = `INSERT INTO category (category_id, category_name, category_description)
                            VALUES(?,?,?)`;
    
    database.query(sqlScript, [category_id, category_name, category_description], (err, result) => {
        if(err){
            console.log(err);
            return res.status(500).send('Something wrong with inserting category');
        }
        return res.status(201).send('Entry added to the category');
    });

    }
)

module.exports = router;
