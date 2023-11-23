const { query } = require("../database/db");

/**
 * Retrieve all shipments from the database.
 * @returns {Promise<Array>} A promise that resolves to an array of shipments.
 * @throws {Error} If an error occurs while fetching the shipments.
 */
const getShipments = async () => {
    try {
        let sql = `SELECT * FROM shipment`;
        const shipments = await query(sql);
        return shipments;
    } catch(error) {
        throw new Error(error);
    }
}

/**
 * Retrieve a specific shipment by its ID from the database.
 * @param {number} shipment_ID - The ID of the shipment to retrieve.
 * @returns {Promise<Array>} A promise that resolves to an array containing the specified shipment.
 * @throws {Error} If an error occurs while fetching the shipment.
 */
const getShipmentById = async(shipment_ID) => {
    try {
        let sql = `SELECT * FROM shipment WHERE shipment_ID = ?`;
        const shipment = await query(sql, [shipment_ID]);
        return shipment;
    } catch(error) {
        throw new Error(error);
    }
}

/**
 * Retrieve all shipments associated with a specific user from the database.
 * @param {number} user_ID - The ID of the user to retrieve shipments for.
 * @returns {Promise<Array>} A promise that resolves to an array of shipments for the specified user.
 * @throws {Error} If an error occurs while fetching the shipments.
 */
const getShipmentsByUserId = async(user_ID) => {
    try {
        let sql = `SELECT * FROM shipment WHERE user_ID = ?`;
        const shipment = await query(sql, [user_ID]);
        return shipment;
    } catch(error) {
        throw new Error(error);
    }
}

/**
 * Insert a new shipment into the database.
 * @param {number} order_ID - The ID of the order associated with the shipment.
 * @param {number} user_ID - The ID of the user associated with the shipment.
 * @returns {Promise<Array>} A promise that resolves to the newly added shipment.
 * @throws {Error} If an error occurs while inserting the shipment.
 */
const insertShipment = async(order_ID, user_ID) => {
    try {
        let sql = `INSERT INTO shipment 
            (order_ID, user_ID)
            VALUES
            (?, ?);
            `;
        const result = await query(sql, 
            [
                order_ID,
                user_ID
            ]);
        let addedShipment = await query("SELECT * FROM shipment WHERE shipment_ID = ?", [result?.insertId]);
        return addedShipment;
    } catch(error) {
        throw new Error(error);
    }
}

/**
 * Delete a specific shipment from the database.
 * @param {number} shipment_ID - The ID of the shipment to delete.
 * @returns {Promise<Array>} A promise that resolves to the deleted shipment.
 * @throws {Error} If an error occurs while deleting the shipment.
 */
const deleteShipment = async(shipment_ID) => {
    try {
        let sql = `DELETE FROM shipment WHERE shipment_ID = ?`;
        const shipment = await query (sql, [shipment_ID]);
        return shipment;
    } catch(error) {
        throw new Error(error);
    }
}

module.exports = {
    getShipments,
    getShipmentById,
    getShipmentsByUserId,
    insertShipment,
    deleteShipment,
}

