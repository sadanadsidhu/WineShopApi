const mongoose = require('mongoose');

const confirmOrderArraySchema = new mongoose.Schema({
    
       confirmOrder : {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'AllCustomerAndProductDetails',
                required: true
            },
            // shopId:{
            //     type: mongoose.Schema.Types.ObjectId,
            //     ref: 'WineShop',
            //     required: true,
            // },
            delevaryBoyId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'AllDeliveryBoyRegisterData'
            }   
});

module.exports = mongoose.model('ConfirmOrder', confirmOrderArraySchema);