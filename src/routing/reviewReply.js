const express = require('express');
const router = express.Router();
const { getReplyByReview, createReply } = require('../db/reviewReply');
const path = require("path");
const fs = require("fs");

router.get("/:reviewId", async (req, res) => {
    const db = req.app.get("db");
    const reviewId = req.params.reviewId;

    try {
        const reply = await getReplyByReview(db, reviewId);

        if (!reply || reply.length === 0) {
            return res.status(404).json({ message: "No reply found for this review" });
        }

        return res.status(200).json(reply);
    }
    catch (err) {
        res.status(500).json({ error: "Failed to get reply with review id. ", details: err.message });
    }
});

router.post('/', async (req, res) => {
    const db = req.app.get("db");

    const {reviewId, replyText, ownerId} = req.body;
    console.log("why");

    try {
        const result = await createReply(db, reviewId, replyText, ownerId);

        if (!result) {
            return res.status(400).json({ error: "Failed to create reply" });
        }

        return res.status(201).json({ message: "Reply created successfully." });
    }
    catch (err) {
        return res.status(500).json({ error: "Failed to create reply:", details: err.message });
    }
});

module.exports = router;