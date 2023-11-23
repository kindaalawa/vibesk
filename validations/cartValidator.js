const { check } = require('express-validator');

const insertCartValidation = [
  check('product_ID').notEmpty().withMessage('Product ID is required'),
  check('user_ID').notEmpty().withMessage('user ID is required'),
  check('quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
];

const updateCartValidation = [
  check('product_ID').notEmpty().withMessage('Product ID is required'),
  check('user_ID').notEmpty().withMessage('user_ID is required'),
  check('quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
];

module.exports = {
  insertCartValidation,
  updateCartValidation
};
