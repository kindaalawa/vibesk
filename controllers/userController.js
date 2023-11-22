const { validationResult } = require("express-validator");

const {
    getUsers,
    getUserById,
    insertUser,
    updateUser,
    deleteUser
} = require("../services/userService");

const getUsersController = async (req, res) => {
    try {
        const user = await getUsers();
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: error?.message });
    }
};

const getUserByIdController = async (req, res) => {
    const { user_ID } = req.body;

    if (!user_ID) {
        return res.status(400).json({ message: "missing user ID" });
    }
    try {
        const result = await getUserById(user_ID);
        res.status(200).json({ result });
    } catch (error) {
        res.status(500).json({ message: error?.message });
    }
};

const insertUserController = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { user_FullName, user_Email, user_Password, user_PhoneNumber } = req.body;

    try {
        const response = await insertUser(user_FullName, user_Email, user_Password, user_PhoneNumber);
        res.status(201).json({ response });
    } catch (error) {
        res.status(500).json({ error: error?.message });
    }
};

const updateUserController = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { user_ID, user_FullName, user_Email, user_Password, user_PhoneNumber } = req.body;

    try {
        const response = await updateUser({ user_ID, user_FullName, user_Email, user_Password, user_PhoneNumber });
        res.status(201).json({ response });
    } catch (error) {
        res.status(500).json({ error: error?.message });
    }
};

const deleteUserController = async (req, res) => {
    const { user_ID } = req.body;

    if (!user_ID) {
        return res.status(400).json({ message: "Missing user id" });
    }

    try {
        const result = await deleteUser(user_ID);
        res.status(200).json({ result });
    } catch (error) {
        res.status(500).json({ message: error?.message });
    }
};

module.exports = {
    getUsersController,
    getUserByIdController,
    insertUserController,
    updateUserController,
    deleteUserController
};
