const express = require('express');
const router = express.Router();
const { createUser,loginUser } = require('../controllers/customerRegisterController');

// Define routes
router.post('/customer-register', createUser);
router.post('/customer-login',loginUser);

module.exports = router;