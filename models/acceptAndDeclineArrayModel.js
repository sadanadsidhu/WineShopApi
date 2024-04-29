const mongoose = require('mongoose');

const allAcceptAndDeclineOrderSchema = new mongoose.Schema({
    
    acceptOrder : [{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'AllCustomerAndProductData',
                required: true
            }],

    declineOrderId: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'AllCustomerAndProductData',
                required: true
            }]
   
});

module.exports = mongoose.model('AcceptAndDeclineOrder', allAcceptAndDeclineOrderSchema);
