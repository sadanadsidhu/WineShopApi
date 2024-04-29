const express = require('express');
const router = express.Router();
const {
    
    addDeclineOrder,
    getDeclineOrders,
    

} = require('../controllers/declineOrderDataController');

// Define routes
router.post('/add-decline-order-array', addDeclineOrder);
router.get('/get-decline-order-array/:shopId', getDeclineOrders);


module.exports = router;