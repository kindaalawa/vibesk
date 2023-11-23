const express = require('express');
const {
    getAllProductsController,
    getProductByIdController,
    getProductByCategoryIdController,
    getProductsFromLowerToHigherPriceController,
    getProductsFromHigherToLowerPriceController,
    insertProductController,
    updateProductController,
    deleteProductController
} = require('../controllers/productController');

const {
    insertProductValidation,
    updateProductValidation,
} = require('../validations/productValidator');

const router = express.Router();

router.get('/products', getAllProductsController);
router.post('/product', getProductByIdController);
router.post('/byCategory', getProductByCategoryIdController);
router.post('/byCategoryFromLowToHigh', getProductsFromLowerToHigherPriceController);
router.post('/byCategoryFromHighToLow', getProductsFromHigherToLowerPriceController);
router.post('/newProduct', insertProductValidation, insertProductController);
router.put('/product', updateProductValidation, updateProductController );
router.delete('/product', deleteProductController);

module.exports = router;
