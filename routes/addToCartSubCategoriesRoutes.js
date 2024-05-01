const express = require('express');
const router = express.Router();
const {
    getCart,
    addToCart,
    updateCartItem,
    deleteCartItem,
    deleteCartItemById,
    deleteAllCartItems,
    saveAllCartItems, // Import the new controller function
} = require('../controllers/addToCartSubCategoriesController');

// Define routes
router.get('/get-add-cart-all', getCart);
router.post('/add-to-cart', addToCart);
router.put('/update-cart/:cartId', updateCartItem);
router.delete('/delete-hidden-cart-item', deleteCartItem);
router.delete('/delete-cart-item/:cartId', deleteCartItemById);
router.delete('/delete-all-cart-items', deleteAllCartItems); // Add the new route for deleting all cart items
router.post('/save-all-cart-items', saveAllCartItems); // Add the new route for deleting all cart items

module.exports = router;
