const express = require('express');
const router = express.Router();
const {
    addConfirmOrder,
    getConfirmOrders,

} = require('../controllers/confirmedOrderArrayController');

// Define routes
router.post('/add-confirm-order-array', addConfirmOrder);
router.get('/get-get-order-array/:shopId', getConfirmOrders);


module.exports = router