const userModel = require('../models/userOtpVarificationModel');
// const userModel = require('../models/wineSubCategoriesModel');
const AllAddCart = require('../models/allAddToCardSubCategoriesModel');

const addAllToCart = async (req, res) => {
    try {
        // Destructure the request body to get the required data
        const { price,deliveryCharge,discount,coupon,grandTotal,itemCount,allcart } = req.body;

        // Create a new document in the AddToCart collection with the provided data
        const addToCartDoc = new AllAddCart({price,deliveryCharge,discount,coupon,grandTotal,itemCount, allcart });

        // Save the document to the database
        await addToCartDoc.save();

        // Fetch the saved document again to ensure all fields are included in the response
        const savedDoc = await AllAddCart.findById(addToCartDoc._id).select('quantity totalPrice ml cart');

        // Return a success response with the saved document
        return res.status(200).json({ 
            code: 200, 
            message: 'All Cart added successfully.', 
            data: savedDoc
        });
    } catch (error) {
        // Handle any errors that occur during the process
        return res.status(500).json({ code: 500, message: 'Server error', error: error.message });
    }
};

//////////////////////////get add card -------------------------------->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
const getAllToCart = async (req, res) => {
    try {
        // Query the AddToCart collection to retrieve all documents
        const cartData = await AllAddCart.find().populate('allcart');

        // Check if any data was found
        if (!cartData || cartData.length === 0) {
            return res.status(404).json({ code: 404, message: 'Cart data not found' });
        }

        // Return the cart data in the response
        return res.status(200).json({ code: 200, message: 'All Cart data retrieved successfully.', data: cartData });
    } catch (error) {
        return res.status(500).json({ code: 500, message: 'Server error', error: error.message });
    }
};

const deleteAllToCart = async (req, res) => {
    try {
        const { id } = req.params;

        // Delete the document from the AllAddCart collection
        const deletedCart = await AllAddCart.findByIdAndDelete(id);

        if (!deletedCart) {
            return res.status(404).json({ code: 404, message: 'Cart not found' });
        }

        // Return the deleted document
        return res.status(200).json({ code: 200, message: 'Cart deleted successfully.', data: deletedCart });
    } catch (error) {
        return res.status(500).json({ code: 500, message: 'Server error', error: error.message });
    }
};

const updateAllToCart = async (req, res) => {
    try {
        const { id } = req.params;
        const newData = req.body;

        // Update the document in the AllAddCart collection
        const updatedCart = await AllAddCart.findByIdAndUpdate(id, newData, { new: true });

        if (!updatedCart) {
            return res.status(404).json({ code: 404, message: 'Cart not found' });
        }

        // Return the updated document
        return res.status(200).json({ code: 200, message: 'Cart updated successfully.', data: updatedCart });
    } catch (error) {
        return res.status(500).json({ code: 500, message: 'Server error', error: error.message });
    }
};
module.exports = {
    addAllToCart,
    getAllToCart,
    updateAllToCart,
    deleteAllToCart   
};