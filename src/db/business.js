const logger = require("./../logging/logging");

const getBusiness = async function(db, business_id){

    const getBusinessScript = `SELECT * FROM BUSINESS
                                WHERE business_id = ?`;

    try {
        const [result] = await db.execute(getBusinessScript, [business_id]);

        if (!result || result.length === 0) {
            return null;
        }
        return result;
    }
    catch (err) {
        logger.error("Error when getting businesses:", err);
        throw err;
    }
};

const setBusiness = async function(db, business_id, business_name, business_contact_email, business_contact_phone, owner_id){

    // we will need to create a query that creates a business:
    const setBusinessScript = `
        INSERT INTO business (business_id, business_name, business_contact_email, business_contact_phone, owner_id) 
        VALUES (?, ?, ?, ?, ?)`;

    const callback_values = [business_id, business_name, business_contact_email, business_contact_phone, owner_id];

    try {
        const [result] = await db.execute(setBusinessScript, callback_values);
        return result;
    }
    catch (err) {
        logger.error("Error setting business:", err);
        throw err;
    }
}

module.exports = {setBusiness, getBusiness};