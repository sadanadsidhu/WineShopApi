const express = require('express');
const router = express.Router();
const {
    initiatePayment
} = require('../controllers/phonePayGateWayController');

// Define routes

router.post('/payload', initiatePayment);


module.exports = router;