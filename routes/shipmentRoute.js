const express = require('express');
const {
    getShipmentsController,
    getShipmentByIdController,
    getShipmentsByUserIdController,
    insertShipmentController,
    deleteShipmentController,
} = require('../controllers/shipmentController');

const {
    insertShipmentValidation,
} = require('../validations/shipmentValidator');

const router = express.Router();

router.get('/shipments', getShipmentsController);
router.post('/shipment', getShipmentByIdController);
//router.post('/userShipments', getShipmentsByUserIdController);
router.post('/newShipment', insertShipmentValidation, insertShipmentController);
router.delete('/shipment', deleteShipmentController);

module.exports = router;
