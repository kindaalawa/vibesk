const express = require('express');
const {
    getCustomersController,
    getCustomerByIdController,
    insertCustomerController,
    updateCustomerController,
    deleteCustomerController
} = require('../controllers/customerController');

const { 
    insertCustomerValidation,
    updateCustomerValidation,
} = require('../validations/customerValidator');

const router = express.Router();

router.get('/customers', getCustomersController);
router.post('/customer', getCustomerByIdController);
router.post('/newCustomer', insertCustomerValidation, insertCustomerController );
router.put('/customer', updateCustomerValidation, updateCustomerController );
router.delete('/customer', deleteCustomerController);

module.exports = router;