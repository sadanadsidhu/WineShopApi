const express = require('express');
const router = express.Router();
const { createAadharDetails,getAadharDetails } = require('../controllers/aadharFetchDataController');

// Define routes
router.post('/post-aadhar-details', createAadharDetails);
router.get('/get-aadhar-details',getAadharDetails);


module.exports = router;

