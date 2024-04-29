const express = require('express');
const router = express.Router();
const {
    
    addDeclineOrder,
    getAcceptOrders,
    

} = require('../controllers/declineOrderDataController');

// Define routes
router.post('/add-decline-order-array', addDeclineOrder);
router.get('/get-accept-order-array/:shopId', getAcceptOrders);


module.exports = router;