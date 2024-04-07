const express = require('express');
const router = express.Router();
const {
    addAllToCart,
    getAllToCart,
    updateAllToCart,
    deleteAllToCart
} = require('../controllers/allAddToCardSubCategoriesController');

// Define routes
router.post('/add-all-data-to-cart', addAllToCart);
router.get('/get-allToCartdata-to-cart', getAllToCart);
router.put('/delete-allToCartdata-to-cart', updateAllToCart);
router.delete('/delete-allToCartdata-to-cart', deleteAllToCart);


module.exports = router;