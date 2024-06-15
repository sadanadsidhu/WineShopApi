const express = require('express');
const router = express.Router();
const {
    
    addDeclineOrder,
    getDeclineOrders,
    deleteAllDeclineOrders,
    deleteDeclineOrderById,

} = require('../controllers/declineOrderDataController');

// Define routes
router.post('/add-decline-order-array', addDeclineOrder);
router.get('/get-decline-order-array/:shopId', getDeclineOrders);
router.delete('/delete-all-decline-order-array', deleteAllDeclineOrders);
router.delete('/delete-decline-order-array/:declineOrderId', deleteDeclineOrderById);


module.exports = router;