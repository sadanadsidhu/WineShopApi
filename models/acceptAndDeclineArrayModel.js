const mongoose = require('mongoose');

const allAcceptAndDeclineOrderSchema = new mongoose.Schema({
    
    acceptOrder : [{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'SubWineCategory',
                required: true
            }],

    declineOrder: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'SubWineCategory',
                required: true
            }]
   
});

module.exports = mongoose.model('AcceptAndDeclineOrder', allAcceptAndDeclineOrderSchema);
