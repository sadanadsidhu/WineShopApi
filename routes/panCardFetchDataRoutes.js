const express = require('express');
const router = express.Router();
const { createPanCardDetails, getPanCardDetails } = require('../controllers/panCardFetchDataController');

// Define routes
router.post('/post-card-details', createPanCardDetails);
router.get('/get-card-details', getPanCardDetails);

module.exports = router;
