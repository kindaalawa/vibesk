const { validationResult } = require("express-validator");
const {
    getCarts,
    getCartById,
    getCartByUserId,
    insertCart,
    updateCart,
    deleteCart,
} = require("../services/cartService");

const getAllCartsController = async (req, res) => {
    try {
        const carts = await getCarts();
        res.status(200).json({ carts });
    } catch (error) {
        res.status(500).json({ message: error?.message });
    }
}

const getCartByIdController = async (req, res) => {
    const { cart_ID } = req.body;
    if (!cart_ID){
        return res.status(400).json({ message: "Missing cart ID"});
    }
    try {
        const result = await getCartById(cart_ID);
        res.status(200).json({ result });
    } catch (error) {
        res.status(500).json({ message: error?.message });
    }
}

const getCartByUserIdController = async (req, res) => {
    const { user_ID } = req.body;
    if (!user_ID){
        return res.status(400).json({ message: "Missing user ID"});
    }
    try {
        const result = await getCartByUserId(user_ID);
        res.status(200).json({ result });
    } catch (error) {
        res.status(500).json({ message: error?.message });
    }
}

const insertCartController = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { user_ID, product_ID, quantity } = req.body;

    try {
        const response = await insertCart(user_ID, product_ID, quantity);
        res.status(201).json({ response });
    } catch (error) {
        res.status(500).json({ error: error?.message });
    }
}

const updateCartController = async (req, res) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { cart_ID, user_ID, product_ID, quantity } = req.body;

    try {
        const response = await updateCart({ cart_ID, user_ID, product_ID, quantity });
        res.status(201).json({ response });
    } catch (error) {
        res.status(500).json({ error: error?.message });
    }
}

const deleteCartController = async (req, res) => {
    const { product_ID } = req.body;

    if (!product_ID) {
        return res.status(400).json({ message: "Missing Product ID" });
    }

    try {
        const result = await deleteCart(product_ID);
        res.status(200).json({ result });
    } catch (error) {
        res.status(500).json({ message: error?.message });
    }
}

module.exports = {
    getAllCartsController,
    getCartByIdController,
    getCartByUserIdController,
    insertCartController,
    updateCartController,
    deleteCartController
};
