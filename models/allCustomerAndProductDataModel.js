const mongoose = require('mongoose');

const allCustomerAndProductDataSchema = new mongoose.Schema({
    dataArray: {
        type: {
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
        },
        required: true
    }
});

module.exports = mongoose.model('AllCustomerAndProductData', allCustomerAndProductDataSchema);
