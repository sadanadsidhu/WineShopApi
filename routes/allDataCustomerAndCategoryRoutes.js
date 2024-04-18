const express = require('express');
const router = express.Router();
const {
    createDataCustomerAndProduct,
    getAllDataCustomerAndProduct,
    updateDataCustomerAndProduct,
    deleteDataCustomerAndProduct
} = require('../controllers/allDataCustomerAndCategoryController');

router.post('/create-all-customer-product', createDataCustomerAndProduct);
router.get('/get-all-customer-product', getAllDataCustomerAndProduct);
router.put('/update-all-customer-product/:id', updateDataCustomerAndProduct);
router.delete('/delete-all-customer-product/:id', deleteDataCustomerAndProduct);

module.exports = router;