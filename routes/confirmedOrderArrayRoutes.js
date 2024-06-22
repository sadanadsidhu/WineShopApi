const express = require('express');
const router = express.Router();
const {
    addConfirmOrder,
    getConfirmOrders,
    deleteConfirmedOrderById

} = require('../controllers/confirmedOrderArrayController');

// Define routes
router.post('/add-confirm-order', addConfirmOrder);
router.get('/get-confirm-order/:id', getConfirmOrders);
router.delete('/delete-confirm-order/:id', deleteConfirmedOrderById);


module.exports = router