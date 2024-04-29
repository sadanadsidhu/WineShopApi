const mongoose = require('mongoose');

// Define the decline order schema
const declineOrderSchema = new mongoose.Schema({
    declineOrder: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubWineCategory', // Reference to the SubWineCategory model
        required: true
    }],
    shopId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'WineShop', // Reference to the WineShop model
        required: true
    }
});

// Create and export the DeclineOrder model based on the schema
module.exports = mongoose.model('DeclineOrder', declineOrderSchema);
