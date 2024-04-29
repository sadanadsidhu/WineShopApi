const express = require('express');
const router = express.Router();
const {
    addAcceptOrder,
    getAcceptOrders,

} = require('../controllers/acceptAndDeclineArrayController');

// Define routes
router.post('/add-accept-order-array', addAcceptOrder);
router.get('/get-accept-order-array/:shopId', getAcceptOrders);


module.exports = router;