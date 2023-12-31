const { validationResult } = require("express-validator");
const {
    getProducts,
    getProductById,
    getProductByCategoryId,
    getProductsFromLowerToHigherPrice,
    getProductsFromHigherToLowerPrice,
    insertProduct,
    updateProduct,
    deleteProduct,
} = require("../services/productService");

const getAllProductsController = async (req, res) => {
    try {
        const products = await getProducts();
        res.status(200).json({ products });
    } catch (error) {
        res.status(500).json({ message: error?.message });
    }
}

const getProductByIdController = async (req, res) => {
    const { product_ID } = req.body;

    if(!product_ID){
        return res.status(400).json({message: "missing product ID"});
    }
    try {
        const result = await getProductById(product_ID);
        res.status(200).json({ result });
    } catch(error) {
        res.status(500).json({ message: error?.message });
    }
}

const getProductByCategoryIdController = async (req, res) => {
    const { category_ID } = req.body;

    if(!category_ID){
        return res.status(400).json({message: "missing category ID"});
    }
    try {
        const result = await getProductByCategoryId(category_ID);
        res.status(200).json({ result });
    } catch(error) {
        res.status(500).json({ message: error?.message });
    }
}

const getProductsFromLowerToHigherPriceController = async (req, res) => {
    const { category_ID } = req.body;

    if(!category_ID){
        return res.status(400).json({message: "missing category ID"});
    }
    try {
        const result = await getProductsFromLowerToHigherPrice(category_ID);
        res.status(200).json({ result });
    } catch(error) {
        res.status(500).json({ message: error?.message });
    }
}

const getProductsFromHigherToLowerPriceController = async (req, res) => {
    const { category_ID } = req.body;

    if(!category_ID){
        return res.status(400).json({message: "missing category ID"});
    }
    try {
        const result = await getProductsFromHigherToLowerPrice(category_ID);
        res.status(200).json({ result });
    } catch(error) {
        res.status(500).json({ message: error?.message });
    }
}

const insertProductController = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {product_Name, product_IMG, product_Description, product_Info, product_Price, category_ID} = req.body;

    try {
        const response = await insertProduct(product_Name, product_IMG, product_Description, product_Info, product_Price, category_ID);
        res.status(201).json({ response });
    } catch (error) {
        res.status(500).json({ error: error?.message });
    }
}

const updateProductController = async (req, res) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { product_ID, product_Name, product_IMG, product_Description, product_Info, product_Price, category_ID } = req.body;

    try {
        const response = await updateProduct({ product_ID, product_Name, product_IMG, product_Description, product_Info, product_Price, category_ID });
        res.status(201).json({ response });
    } catch (error) {
        res.status(500).json({ error: error?.message });
    }
}

const deleteProductController = async (req, res) => {
    const { product_ID } = req.body;

    if (!product_ID) {
        return res.status(400).json({ message: "missing product id" });
    }

    try {
        const result = await deleteProduct(product_ID);
        res.status(200).json({ result });
    } catch (error) {
        res.status(500).json({ message: error?.message });
    }
}

module.exports = {
    getAllProductsController,
    getProductByIdController,
    getProductByCategoryIdController,
    getProductsFromLowerToHigherPriceController,
    getProductsFromHigherToLowerPriceController,
    insertProductController,
    updateProductController,
    deleteProductController
};
