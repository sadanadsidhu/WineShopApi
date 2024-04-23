const express = require('express');
const router = express.Router();
const {
    createAllCustomerAndProductData
} = require('../controllers/allCustomerAndProductDataController');

// Define routes
router.post('/create-customer-data-to-cart', createAllCustomerAndProductData);



module.exports = router;