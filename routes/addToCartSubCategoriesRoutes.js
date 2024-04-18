const express = require('express');
const router = express.Router();
const {
    getCart,
    addToCart,
    updateCartItem,
    deleteCartItem,
    deleteAllCartItems,
    saveAllCartItems, // Import the new controller function
} = require('../controllers/addToCartSubCategoriesController');

// Define routes
router.get('/get-add-cart-all/:mobileNumber', getCart);
router.post('/add-to-cart', addToCart);
router.put('/update-cart/:id', updateCartItem);
router.delete('/delete-cart-item/:cartId', deleteCartItem);
router.delete('/delete-all-cart-items', deleteAllCartItems); // Add the new route for deleting all cart items
router.post('/save-all-cart-items', saveAllCartItems); // Add the new route for deleting all cart items

module.exports = router;
