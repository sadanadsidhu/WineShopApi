const express = require('express');
const router = express.Router();
const uploadController = require('../middleware/uploadImageController');

// Route for uploading a file
router.put('/edit/images/:filename', uploadController.updateImage);
router.post('/upload/images', uploadController.uploadFile); // Corrected function name
router.delete('/delete/images/:filename',uploadController.deleteImage);
router.get('/get/image/:imageName', uploadController.getImage);

module.exports = router;

