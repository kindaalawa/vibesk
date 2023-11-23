const { check } = require('express-validator');

const insertShipmentValidation = [
  check('order_ID').notEmpty().withMessage('Order ID is required'),
  check('user_ID').notEmpty().withMessage('user ID is required'),
];

module.exports = {
  insertShipmentValidation,
};
