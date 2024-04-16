const express = require('express');
const router = express.Router();
const uploadController = require('../middleware/uploadswiperImages');


router.post('/upload-swiperShop-images', uploadController.uploadFile);
router.get('/imagesswiper/:imageName', uploadController.getImagesFromSwiperImages);
router.get('/get-swiper-image/:filename', uploadController. getSwiperImageByFilename
);

module.exports = router;