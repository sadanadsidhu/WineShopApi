const express = require('express');
const router = express.Router();
const { createUser,getUserById } = require('../controllers/customerRegisterController');

// Define routes
router.post('/customer-register', createUser);
router.get('/get-customer', getUserById);

module.exports = router;