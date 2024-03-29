const express = require('express');
const router = express.Router();
const {  getAllSelfies,createSelfie } = require('../controllers/selfieImagesWithStatusController');

// Define routes
router.post('/create-selfie',createSelfie);
router.get('/get-all-selfie',getAllSelfies);

module.exports = router;