const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/uploadImageController');

// Route for uploading a file
router.put('/edit/images/:filename', uploadController.updateImage);
router.post('/upload/images', uploadController.uploadFile);
router.delete('/delete/images/:filename',uploadController.deleteImage);

module.exports = router;
 
