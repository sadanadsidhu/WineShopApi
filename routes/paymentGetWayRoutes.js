const express = require('express');
const router = express.Router();
const {
    checkout,
    paymentverification,
    getApiKey
     } = require('../controllers/paymentGetWayController');

// Define routes
router.post('/checkout', checkout);
router.post('/paymentverification', paymentverification);
router.get('/getkey', getApiKey);


module.exports = router;
