const express = require('express');
const router = express.Router();
const {
    registerDeliveryBoy,
    getAllDeliveryBoys,
    getDeliveryBoyById,
    deleteDeliveryBoyById,
    updateDeliveryBoyById

} = require('../controllers/deliverBoyRegistrationController');

// Define routes
router.post('/register/delivery/boy', registerDeliveryBoy);
router.get('/get/register/delivery/boy', getAllDeliveryBoys);
router.get('/get-get-order-array/:shopId', getDeliveryBoyById);
router.get('/get-get-order-array/:shopId', deleteDeliveryBoyById);
router.get('/get-get-order-array/:shopId', updateDeliveryBoyById);


module.exports = router