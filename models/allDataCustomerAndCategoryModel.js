// const mongoose = require('mongoose');
// const { Schema } = mongoose;

// const allCustomerAndProductDetailsSchema = new Schema([{
//     totalPriceSum:{
//         type:Number,
//         require:true
//     },
//     deliveryCharges:{
//         type:Number,
//         require:true
//     },
//     serviceCharges:{
//         type:Number,
//         require:true
//     },
//     grandTotalPrice:{
//         type:Number,
//         require:true
//     },
//     paymentId:{
//         type:String,
//         require:true,
//     },
//     orderId:{
//         type:Number,
//         require:true
//     },
//     customerAddress:{
//         type:Schema.Types.ObjectId,
//         ref: 'CustomerAddress',
//         required: true,
//     },
//     productDetails:[{
//         type: Schema.Types.ObjectId,
//         ref: 'AddToCart',
//         required: true    
//     }],
//     shopDetails:[{
//         type:Schema.Types.ObjectId,
//         ref: 'WineShop',
//         required: true,
//     }],
// }]);

// module.exports = mongoose.model('CustomerAllOrder', allCustomerAndProductDetailsSchema);

const mongoose = require('mongoose');
const { Schema } = mongoose;

const allCustomerAndProductDetailsSchema = new Schema({
    totalPriceSum:{
        type:Number,
        required:true
    },
    deliveryCharges:{
        type:Number,
        required:true
    },
    serviceCharges:{
        type:Number,
        required:true
    },
    grandTotalPrice:{
        type:Number,
        required:true
    },
    paymentId:{
        type:String,
        required:true,
    },
    orderId:{
        type:Number,
        required:true
    },
    customerAddress:{
        type:Schema.Types.ObjectId,
        ref: 'CustomerAddress',
        required: true,
    },
    productDetails:[{
        type: Schema.Types.ObjectId,
        ref: 'SubWineCategory',
        required: true    
    }],
    shopDetails:{
        type:Schema.Types.ObjectId,
        ref: 'WineShop',
        required: true,
    },
    
});

module.exports = mongoose.model('CustomerAllOrder', allCustomerAndProductDetailsSchema);
