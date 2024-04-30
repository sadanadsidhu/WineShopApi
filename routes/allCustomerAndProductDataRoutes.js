const express = require('express');
const router = express.Router();
const {
    createAllCustomerAndProductData,
    getAllCustomerAndProductData,
    getAllCustomerDataByShopId,
    deleteAllCustomerAndProductData,
    deleteCustomerAndProductDataById,

} = require('../controllers/allCustomerAndProductDataController');

// Define routes
router.post('/create-customer-data-to-cart', createAllCustomerAndProductData);
router.get('/get-all-customer-data-to-cart', getAllCustomerAndProductData);
router.get('/get-shopId-customer-data-to-cart/:shopId', getAllCustomerDataByShopId);
router.delete('/delete-all-shopId-customer-data-to-cart', deleteAllCustomerAndProductData);
router.delete('/delete-one-productId-customer-data-to-cart/:productId', deleteCustomerAndProductDataById);

module.exports = router;   