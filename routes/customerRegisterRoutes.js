const express = require('express');
const router = express.Router();
const { createUser,loginUser,getUsersByMobileNumber } = require('../controllers/customerRegisterController');

// Define routes
router.post('/customer-register', createUser);
router.post('/customer-login',loginUser);
router.get('/get-register-user/:mobileNumber',getUsersByMobileNumber);

module.exports = router;