const mongoose = require('mongoose');

const allCustomerAndProductDataSchema = new mongoose.Schema({
    dataArray: {
        type: [{
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'SubWineCategory',
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            shopId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'WineShop',
                required: true
            }
        }],
        required: true
    },
    orderId: {
        type: Number, // or String, depending on your preference
        required: true,
        unique: true // If orderId needs to be unique for each document
    }
});

module.exports = mongoose.model('AllCustomerAndProductData', allCustomerAndProductDataSchema);
