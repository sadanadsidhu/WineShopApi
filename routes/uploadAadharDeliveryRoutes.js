const express = require('express');
const router = express.Router();
const {
    uploadAadharFile,
    getDeliveryAadharImages,
    getDeliveryAadharImageByFilename

} = require('../middleware/uploadAadharDelivery');

// Define routes
router.post('/upload/delivery/aadhar', uploadAadharFile);
router.get('/get/delivery/aadhar', getDeliveryAadharImages);
router.get('/get-get-order-array/:shopId', getDeliveryAadharImageByFilename);


module.exports = router