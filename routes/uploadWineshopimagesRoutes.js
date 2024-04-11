const express = require('express');
const router = express.Router();
const uploadController = require('../middleware/uploadWineShopImages');


router.post('/upload-wineShop-images', uploadController.uploadFile);
router.get('/get-all-wineshop-images', uploadController.getImagesFromWineShopFolder);
router.get('/get-wineshop-image/:filename', uploadController.getWineShopImageByFilename);

module.exports = router;