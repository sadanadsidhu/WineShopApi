const userModel = require('../models/userOtpVarificationModel');
// const userModel = require('../models/wineSubCategoriesModel');
const AddToCart = require('../models//addToCartSubCategoriesModel');

// const addToCart = async (req, res) => {
//     try {
//         const { quantity,totalPrice,ml,cart } = req.body;

//         // Create a new document in the AddToCart collection
//         const addToCartDoc = new AddToCart({ quantity,totalPrice,ml,cart });

//         // Save the document to the database
//         await addToCartDoc.save();

//         return res.status(200).json({ code: 200, message: 'Cart added successfully.', data: addToCartDoc });
//     } catch (error) {
//         return res.status(500).json({ code: 500, message: 'Server error', error: error.message });
//     }
// };
const addToCart = async (req, res) => {
    try {
        // Destructure the request body to get the required data
        const { quantity, totalPrice, ml, cart } = req.body;

        // Create a new document in the AddToCart collection with the provided data
        const addToCartDoc = new AddToCart({ quantity, totalPrice, ml, cart });

        // Save the document to the database
        await addToCartDoc.save();

        // Fetch the saved document again to ensure all fields are included in the response
        const savedDoc = await AddToCart.findById(addToCartDoc._id).select('quantity totalPrice ml cart');

        // Return a success response with the saved document
        return res.status(200).json({ 
            code: 200, 
            message: 'Cart added successfully.', 
            data: savedDoc
        });
    } catch (error) {
        // Handle any errors that occur during the process
        return res.status(500).json({ code: 500, message: 'Server error', error: error.message });
    }
};

//////////////////////////get add card -------------------------------->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
const getCart = async (req, res) => {
    try {
        // Query the AddToCart collection to retrieve all documents
        const cartData = await AddToCart.find().populate('cart');

        // Check if any data was found
        if (!cartData || cartData.length === 0) {
            return res.status(404).json({ code: 404, message: 'Cart data not found' });
        }

        // Return the cart data in the response
        return res.status(200).json({ code: 200, message: 'Cart data retrieved successfully.', data: cartData });
    } catch (error) {
        return res.status(500).json({ code: 500, message: 'Server error', error: error.message });
    }
};

const updateCartItem = async (req, res) => {
    try {
        const { cartId } = req.params;
        const { cart } = req.body;

        // Find the cart item by ID and update it
        const updatedCartItem = await AddToCart.findByIdAndUpdate(cartId, { cart }, { new: true });

        if (!updatedCartItem) {
            return res.status(404).json({ code: 404, message: 'Cart item not found' });
        }

        return res.status(200).json({ code: 200, message: 'Cart item updated successfully.', data: updatedCartItem });
    } catch (error) {
        return res.status(500).json({ code: 500, message: 'Server error', error: error.message });
    }
};

// Delete cart item
const deleteCartItem = async (req, res) => {
    try {
        const { cartId } = req.params;

        // Find the cart item by ID and delete it
        const deletedCartItem = await AddToCart.findByIdAndDelete(cartId);

        if (!deletedCartItem) {
            return res.status(404).json({ code: 404, message: 'Cart item not found' });
        }

        return res.status(200).json({ code: 200, message: 'Cart item deleted successfully.', data: deletedCartItem });
    } catch (error) {
        return res.status(500).json({ code: 500, message: 'Server error', error: error.message });
    }
};

module.exports={
     getCart,
     addToCart,
     updateCartItem ,
     deleteCartItem 
 };
