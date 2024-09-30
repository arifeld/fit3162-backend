const logger = require("./../logging/logging");

const getReplyByReview = async function(db, reviewId) {

    const getReplyByReviewScript = `
    SELECT reply_id, reply_text, reply_date, owner_id 
    FROM review_reply 
    WHERE review_id = ?;`;

    try {
        const result = await db.promise().execute(getReplyByReviewScript, [reviewId]);
        if (!result || result.length === 0) {
            return null;
        }

        return result[0];
    }
    catch (err) {
        logger.error("Error getting reply:", err);
        throw err;
    }
}


const createReply = async function(db, reviewId, replyText, ownerId) {

    const createReplyScript = `
        INSERT INTO review_reply (review_id, reply_text, reply_date, owner_id)
        VALUES (?, ?, ?, ?)`;

    const callback_values = [reviewId, replyText, new Date(), ownerId]

    try {
        const result = await db.promise().execute(createReplyScript, callback_values);
        return result;
    }
    catch (err) {
        logger.error("Error creating review reply:", err);
        throw err;
    }
};

module.exports = { getReplyByReview, createReply };