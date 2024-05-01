const express = require('express');
const router = express.Router();
const {
    uploadDeliveryBoyPhoto,
    getDeliveryBoyPhoto,
    getDeliveryPhotoByFile

} = require('../middleware/uploadDeliveryBoySelfie');

// Define routes
router.post('/upload/delivery/selfie/photo', uploadDeliveryBoyPhoto);
router.get('/get/delivery/selfie/photo', getDeliveryBoyPhoto);
router.get('/get-get-order-array/:shopId', getDeliveryPhotoByFile);


module.exports = router