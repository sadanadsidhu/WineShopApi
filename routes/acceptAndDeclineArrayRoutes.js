const express = require('express');
const router = express.Router();
const {
    addAcceptOrder,
    addDeclineOrder,
    getAcceptOrders,
    getDeclineOrders

} = require('../controllers/acceptAndDeclineArrayController');

// Define routes
router.post('/add-accept-order-array', addAcceptOrder);
router.post('/add-decline-order-array', addDeclineOrder);
router.get('/get-accept-order-array/:shopId', getAcceptOrders);
router.get('/get-decline-order-array', getDeclineOrders);


module.exports = router;