const express = require('express');
const router = express.Router();
const uploadController = require('../middleware/wineSubCategories');


router.post('/upload-subcategories-images', uploadController.uploadFile);

module.exports = router;