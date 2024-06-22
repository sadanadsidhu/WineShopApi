const express = require("express");
const router = express.Router();
const {
  uploadDeliveryBoyAadhar,
  getDeliveryBoyAadhar,
} = require("../middleware/uploadDeliveryBoyAadhar");
// Define routes
router.post("/upload/deliveryboy/aadhar/photo", uploadDeliveryBoyAadhar);
router.get("/imagesaadhardelivery/:imageName", getDeliveryBoyAadhar);

module.exports = router;
