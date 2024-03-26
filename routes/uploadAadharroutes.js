const express = require('express');
const router = express.Router();
const uploadController = require('../middleware/uploadAadharImages');

// Route for uploading a file
router.put('/edit/aadhar/:filename', uploadController.updateImage);
router.post('/upload/aadhar', uploadController.uploadFile);
router.delete('/delete/aadhar/:filename',uploadController.deleteImage);

module.exports = router;