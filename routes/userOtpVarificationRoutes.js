
const express = require('express');
const router = express.Router();
const {
     sendOtp,
     verifyOtp,
     getAllMobileNumbers
     } = require('../controllers/userOtpVarificationController');

// Define routes
router.post('/send-otp', sendOtp);
router.post('/verify-otp', verifyOtp);
router.get('/get-all-mobileNumber', getAllMobileNumbers);

module.exports = router;



