const { query } = require("../database/db");

/**
 * Retrieve all users from the database.
 * @returns {Promise<Array>} A promise that resolves to an array of user objects.
 * @throws {Error} If there's an error during the database query.
 */
const getUsers = async () => {
    try {
        let sql = `SELECT * FROM user`;
        const users = await query(sql);
        return users;
    } catch (error) {
        throw new Error(error);
    }
}

/**
 * Retrieve a user by their ID.
 * @param {number} user_ID - The ID of the user to retrieve.
 * @returns {Promise<Object|null>} A promise that resolves to the user object or null if not found.
 * @throws {Error} If there's an error during the database query.
 */
const getUserById = async (user_ID) => {
    try {
        let sql = `SELECT * FROM user WHERE user_ID = ?`;
        const user = await query(sql, [user_ID]);
        return user;
    } catch (error) {
        throw new Error(error);
    }
}

/**
 * Insert a new user into the database.
 * @param {string} user_FullName - The full name of the user.
 * @param {string} user_Email - The email address of the user.
 * @param {string} user_Password - The password of the user.
 * @param {number} user_PhoneNumber - The phone number of the user.
 * @returns {Promise<Object>} A promise that resolves to the added user object.
 * @throws {Error} If there's an error during the database query.
 */
const insertUser = async (user_FullName, user_Email, user_Password, user_PhoneNumber) => {
    try {
        let sql = `INSERT INTO user
        (user_FullName, user_Email, user_Password, user_PhoneNumber)
        VALUES
        (?, ?, ?, ?)`;
        const result = await query (sql, 
            [
                user_FullName,
                user_Email,
                user_Password,
                user_PhoneNumber
            ]);
        const addedUser = await query("SELECT * FROM user WHERE user_ID = ?", [result?.insertId]);
        return addedUser;
    } catch (error) {
        throw new Error(error);
    }
}

/**
 * Update an existing user in the database.
 * @param {Object} user - The user object containing fields to be updated.
 * @param {number} user.user_ID - The ID of the user to update.
 * @param {string} user.user_FullName - The updated full name of the user.
 * @param {string} user.user_Email - The updated email address of the user.
 * @param {string} user.user_Password - The updated password of the user.
 * @param {number} user.user_PhoneNumber - The updated phone number of the user.
 * @throws {Error} If there's an error during the database query.
 */
const updateUser = async (user) => {
    try {
        const {user_ID, user_FullName, user_Email, user_Password, user_PhoneNumber} = user;

        let sql = `UPDATE user SET
        user_FullName = ?,
        user_Email = ?,
        user_Password = ?,
        user_PhoneNumber = ?
        WHERE user_ID = ?`;
        await query(sql,
            [
                user_FullName,
                user_Email,
                user_Password,
                user_PhoneNumber,
                user_ID
            ]);
    } catch(error) {
        throw new Error(error);
    }
}

/**
 * Delete a user from the database by ID.
 * @param {number} user_ID - The ID of the user to delete.
 * @returns {Promise<Object>} A promise that resolves to the deleted user object.
 * @throws {Error} If there's an error during the database query.
 */
const deleteUser = async (user_ID) => {
    try {
        let sql = `DELETE FROM user WHERE user_ID = ?`;
        const user = await query (sql, [user_ID]);
        return user;
    } catch(error) {
        throw new Error(error);
    }
}

module.exports = {
    getUsers,
    getUserById,
    insertUser,
    updateUser,
    deleteUser
}
