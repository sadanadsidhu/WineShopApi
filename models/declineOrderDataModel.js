const mongoose = require('mongoose');

const declineOrderSchema = new mongoose.Schema({

    declineOrder: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'SubWineCategory',
                required: true
            }],

    shopId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'WineShop',
        required:true
    }
   
});

module.exports = mongoose.model('DeclineOrder', declineOrderSchema);
