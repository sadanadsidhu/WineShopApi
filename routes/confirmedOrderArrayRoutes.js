const express = require('express');
const router = express.Router();
const {
    addConfirmOrder,
    getConfirmOrders,

} = require('../controllers/confirmedOrderArrayController');

// Define routes
router.post('/add-confirm-order', addConfirmOrder);
router.get('/get-confirm-order/:delevaryBoyId', getConfirmOrders);


module.exports = router