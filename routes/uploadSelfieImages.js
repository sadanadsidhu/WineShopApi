const express = require('express');
const router = express.Router();
const { uploadFile } = require('../middleware/uploadSelfieImages');

// Define routes
router.post('/upload-selfie', uploadFile);



module.exports = router;