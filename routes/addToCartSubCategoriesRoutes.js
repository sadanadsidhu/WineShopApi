const express = require('express');
const router = express.Router();
const {
    getCart,
    addToCart,
    updateCartItem,
    deleteCartItem 
} = require('../controllers/addToCartSubCategoriesController');

// Define routes
router.get('/get-card-item', getCart);
router.post('/add-card-item',addToCart);
router.put('/update-cart-item',updateCartItem );
router.delete('/delete-cart-item',deleteCartItem );


module.exports = router;