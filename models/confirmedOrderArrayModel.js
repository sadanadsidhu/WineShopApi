const mongoose = require('mongoose');

const confirmOrderArraySchema = new mongoose.Schema({
    
       confirmOrder : {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'CustomerAllOrder',
                required: true
            },
            // shopId:{
            //     type: mongoose.Schema.Types.ObjectId,
            //     ref: 'WineShop',
            //     required: true,
            // },
            delevaryBoyId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'AllDeliveryBoyRegisterData',
                required: true,
            }   
});

module.exports = mongoose.model('ConfirmOrder', confirmOrderArraySchema);