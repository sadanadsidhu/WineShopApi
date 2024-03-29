
const express = require('express');
const router = express.Router();
const {
     sendOtp,
     verifyOtp,
     getMobileNumberstatus
     } = require('../controllers/userOtpVarificationController');

// Define routes
router.post('/send-otp', sendOtp);
router.post('/verify-otp', verifyOtp);
router.get('/get-mobile-status/:mobileNumber', getMobileNumberstatus);
module.exports = router;



