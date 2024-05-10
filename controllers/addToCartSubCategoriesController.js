const userModel = require('../models/userOtpVarificationModel');
// const userModel = require('../models/wineSubCategoriesModel');
const AddToCart = require('../models//addToCartSubCategoriesModel');
const Customer=require('../models/customberRegisterModel')


// const addToCart = async (req, res) => {
//     try {
//         const { quantity, ml,totalPrice, cart,mobileNumber } = req.body;
//         const addToCartDoc = new AddToCart({ quantity, ml, totalPrice, cart,mobileNumber });


//         // Find the customer using the retrieved mobile number
//         const customer = await Customer.findOne({ mobileNumber });
        
//         // Check if a customer with the provided userId exists
//         if (!customer || customer.mobileNumber !== mobileNumber) {
//             return res.status(404).json({ code: 404, message: 'Customer not found or mobileNumber does not match' });
//         }
//         const savedDoc = await AddToCart.findById(addToCartDoc._id).select('quantity totalPrice ml cart mobileNumber');
//         await addToCartDoc.save();
//         return res.status(200).json({ 
//             code: 200, 
//             message: 'Cart added successfully.', 
//             data: savedDoc
//         }); 
//     } catch (error) {
//         return res.status(500).json({ code: 500, message: 'Server error', error: error.message });
//     }
// };


const addToCart = async (req, res) => {
    try {
        const { quantity, ml, totalPrice, cart } = req.body;

        const existingCartItem = await AddToCart.findOne({ quantity, ml, totalPrice, cart });

        // If the item already exists, return a message
        if (existingCartItem) {
            return res.status(400).json({
                code: 400,
                message: 'This item is already in the cart.'
            });
        }
         // Calculate total milliliters
        //  const totalMlInCart = await totalMl();

        //  // Calculate total milliliters for the new item being added
        //  const totalMlForNewItem = quantity * ml;
 
        //  // Check if adding the new item will exceed the limit
        //  if (totalMlInCart + totalMlForNewItem > 60000) {
        //      return res.status(400).json({
        //          code: 400,
        //          message: 'Total ml in cart exceeds 60000 grams (6 litre). You cannot order greater than 6 litre.'
        //      });
        //  }

        const addToCartDoc = new AddToCart({ quantity, ml, totalPrice, cart});

        // Save the document to the database
        const savedDoc = await addToCartDoc.save();
         
        // Find the customer using the retrieved mobile number
        // const customer = await Customer.findOne({ mobileNumber });

        // // Check if a customer with the provided mobile number exists
        // if (!customer || customer.mobileNumber !== mobileNumber) {
        //     return res.status(404).json({ code: 404, message: 'Customer not found or mobileNumber does not match' });
        // }

        return res.status(200).json({
            code: 200,
            message: 'Cart added successfully.',
            data: savedDoc
        });
    } catch (error) {
        return res.status(500).json({ code: 500, message: 'Server error', error: error.message });
    }
};
//////////////////////////get add card -------------------------------->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
const getCart = async (req, res) => {
    try {
        // const { mobileNumber } = req.params;
        // Query the AddToCart collection to retrieve all documents
        // const cartData = await AddToCart.find().populate('cart');
        const cartData = await AddToCart.find({ deleted: { $ne: true } }).populate('cart');
        // const cartData = await AddToCart.find({ mobileNumber }).populate('cart');

        // Check if any data was found
        if (!cartData || cartData.length === 0) {
            return res.status(404).json({ code: 404, message: 'Cart data not found' });
        }

        // const totalMl = cartData.reduce((total, item) => total + item.ml, 0);

        // // Check if the total sum exceeds 60000 grams (6 kg)
        // if (totalMl < 6000) {
        //     return res.status(400).json({ code: 400, message: 'Total ml in cart exceeds 60000 grams (6 litre). You cannot order greater than 6 litre.', data: cartData });
        // }
        // Return the cart data in the response
        return res.status(200).json({ code: 200, message: 'Cart data retrieved successfully.', data: cartData });
    } catch (error) {
        return res.status(500).json({ code: 500, message: 'Server error', error: error.message });
    }
};

//////////////////////////////get total price according to ml--------------->>>>>>>>>>>>>>>>>>>>>>>>>>>>>    
// const getTotalPriceByMl = async (req, res) => {
//     try {
//       const { ml } = req.params; // Assuming ml is part of the request parameters
      
//       // Query the database to retrieve the totalPrice based on the provided ml value
//       const cartItem = await AddToCart.findOne({ ml });
  
//       // If no cart item found for the provided ml, return null
//       if (!cartItem) {
//         return res.status(404).json({ error: "Cart item not found" });
//       }
  
//       // Return the totalPrice associated with the provided ml
//       return res.json({ totalPrice: cartItem.totalPrice });
//     } catch (error) {
//       console.error(error);
//       return res.status(500).json({ error: 'Error occurred while fetching totalPrice' });
//     }
//   };
 /////////////////////////////////////---------------->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 
 const updateCartItem = async (req, res) => {
    try {
        const { cartId } = req.params;
        const { quantity, totalPrice, ml, cart } = req.body;

        // Find the cart item by ID and update it
        const updatedCartItem = await AddToCart.findByIdAndUpdate(
            cartId,
            { quantity, totalPrice, ml, cart },
            { new: true }
        );

        if (!updatedCartItem) {
            return res.status(404).json({ code: 404, message: 'Cart item not found' });
        }

        return res.status(200).json({ code: 200, message: 'Cart item updated successfully.', data: updatedCartItem });
    } catch (error) {
        return res.status(500).json({ code: 500, message: 'Server error', error: error.message });
    }
};

// Delete cart item

const deleteAllCartItems = async (req, res) => {
    try {
        // Delete all documents from the AddToCart collection
        const deleteResult = await AddToCart.deleteMany({});

        // Check if any documents were deleted
        if (deleteResult.deletedCount === 0) {
            return res.status(404).json({ code: 404, message: 'No cart items found to delete' });
        }

        // Return success response
        return res.status(200).json({ code: 200, message: 'All cart items deleted successfully' });
    } catch (error) {
        return res.status(500).json({ code: 500, message: 'Server error', error: error.message });
    }
};

const deleteCartItemById = async (req, res) => {
    try {
        const { cartId } = req.params;

        // Find the cart item by its ID and delete it
        const deletedCartItem = await AddToCart.findByIdAndDelete(cartId);

        // Check if the cart item was found and deleted
        if (!deletedCartItem) {
            return res.status(404).json({ code: 404, message: 'Cart item not found' });
        }

        // Return success response
        return res.status(200).json({ code: 200, message: 'Cart item deleted successfully', data: deletedCartItem });
    } catch (error) {
        return res.status(500).json({ code: 500, message: 'Server error', error: error.message });
    }
};

//////////////////hideen cart items
const deleteCartItem = async (req, res) => {
    try {
        // Update all cart items to mark them as deleted
        const deletedCartItems = await AddToCart.updateMany({}, { deleted: true }, { new: true });

        if (!deletedCartItems) {
            return res.status(404).json({ code: 404, message: 'Cart items not found' });
        }

        return res.status(200).json({ code: 200, message: 'All cart items hidden successfully.', data: deletedCartItems });
    } catch (error) {
        return res.status(500).json({ code: 500, message: 'Server error', error: error.message });
    }
};

const saveAllCartItems = async (req, res) => {
    try {
        const { cartData } = req.body;

        // Check if cartData is provided
        if (!cartData || cartData.length === 0) {
            return res.status(400).json({ code: 400, message: 'No cart data provided' });
        }

        // Save each cart item in the database
        const savedItems = "";
        for (const item of cartData) {
            const savedItem = await addToCart(req, res); // Reusing the addToCart function
            savedItems.push(savedItem);
        }

        // Return success response with saved items
        return res.status(200).json({ code: 200, message: 'All cart items saved successfully', data: savedItems });
    } catch (error) {
        return res.status(500).json({ code: 500, message: 'Server error', error: error.message });
    }
};


module.exports = {
    getCart,
    // getTotalPriceByMl,
    addToCart,
    updateCartItem,
    deleteCartItem,
    deleteCartItemById,
    deleteAllCartItems,
    saveAllCartItems 
};

