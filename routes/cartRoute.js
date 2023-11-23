const express = require('express');
const {
    getAllCartsController,
    getCartByIdController,
    getCartByUserIdController,
    insertCartController,
    updateCartController,
    deleteCartController
} = require('../controllers/cartController');

const {
    insertCartValidation,
    updateCartValidation
} = require('../validations/cartValidator');

const router = express.Router();

router.get('/carts', getAllCartsController);
router.post('/cart', getCartByIdController);
router.post('/userCart', getCartByUserIdController);
router.post('/newCart', insertCartValidation, insertCartController);
router.put('/cart', updateCartValidation, updateCartController);
router.delete('/cart', deleteCartController);

module.exports = router;

