// routes/swiperImagesStoreRoutes.js
const express = require('express');
const router = express.Router();
const {
  createImage,
  getAllImages,
  getImageById,
  updateImageById,
  deleteImageById
} = require('../controllers/swiperImagesStoreController');


router.post('/create-swiper-post-images', createImage);
router.get('/get-all-swiper-post-images', getAllImages);
router.get('/get-id-swiper-post-images/:id', getImageById);
router.put('/update-swiper-post-images/:id', updateImageById);
router.delete('/delete-swiper-post-images/:id', deleteImageById);

module.exports = router;
