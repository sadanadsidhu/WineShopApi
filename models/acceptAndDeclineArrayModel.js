const mongoose = require('mongoose');

const allAcceptAndDeclineOrderSchema = new mongoose.Schema({
    
       acceptOrder : [{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'SubWineCategory',
                required: true
            }],
            shopId:{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'WineShop',
                required: true,
            }
});

module.exports = mongoose.model('AcceptAndDeclineOrder', allAcceptAndDeclineOrderSchema);
