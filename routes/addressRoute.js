const express = require('express');
const {
    getAllAddressesController,
    getAddressByIdController,
    getAddressByUserIdController,
    insertAddressController,
    updateAddressController,
    deleteAddressController,
} = require('../controllers/addressController');

const {
    insertAddressValidation,
    updateAddressValidation,
} = require('../validations/addressValidator');

const router = express.Router();

router.get('/addresses', getAllAddressesController);
//router.post('/address', getAddressByIdController);
//router.post('/userAddress', getAddressByUserIdController);
router.post('/newAddress', insertAddressValidation, insertAddressController);
router.put('/address', updateAddressValidation, updateAddressController);
router.delete('/address', deleteAddressController);

module.exports = router;
