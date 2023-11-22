const express = require('express');
const {
    getShipmentsController,
    getShipmentsByCustomerIdController,
    insertShipmentController,
    deleteShipmentController,
} = require('../controllers/shipmentController');

const {
    insertShipmentValidation,
} = require('../validations/shipmentValidator');

const router = express.Router();

router.get('/shipments', getShipmentsController);
router.post('/shipmentForCustomer', getShipmentsByCustomerIdController);
router.post('/newShipment', insertShipmentValidation, insertShipmentController);
router.delete('/shipment', deleteShipmentController);

module.exports = router;