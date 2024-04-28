const express = require('express');
const router = express.Router();
const {
    createAllCustomerAndProductData,
    getAllCustomerAndProductData,
    getAllCustomerDataByShopId
} = require('../controllers/allCustomerAndProductDataController');

// Define routes
router.post('/create-customer-data-to-cart', createAllCustomerAndProductData);
router.get('/get-all-customer-data-to-cart', getAllCustomerAndProductData);
router.get('/get-shopId-customer-data-to-cart/:shopId', getAllCustomerDataByShopId);



module.exports = router;   