const mongoose = require('mongoose');

const allCustomerAndProductDataSchema = new mongoose.Schema({
    data: [{
        cart: {
            _id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            categoryID: {
                type: String,
                required: true
            },
            images: {
                type: String,
                required: true
            },
            miligram: {
                type: Number,
                required: true
            },
            name: {
                type: String,
                required: true
            },
            price: {
                type: Number,
                required: true
            }
        },
        distance: {
            type: Number,
            required: true
        },
        ml: {
            type: Number,
            required: true
        },
        product: {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            productName: {
                type: String,
                required: true
            },
            shopId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Shop',
                required: true
            }
        },
        quantity: {
            type: Number,
            required: true
        },
        shopName: {
            type: String,
            required: true
        },
        totalPrice: {
            type: Number,
            required: true
        }
    }]
});

module.exports = mongoose.model('AllCustomerAndProductData', allCustomerAndProductDataSchema);