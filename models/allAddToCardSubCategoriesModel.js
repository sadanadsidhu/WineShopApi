const mongoose = require('mongoose')
const { Schema } = mongoose;

const allAddToCartSchema = new Schema({
    price:{
        type:Number,
        require:true
    },
    deliveryCharge:{ 
        type:Number,
        require:true
    },
    discount:{
        type:Number,
        require:false
    },
    coupon:{
        type:String,
        require:false
    },
    grandTotal:{
        type:Number,
        require:false
    },
    itemCount:{
        type:Number,
        require:false
    },
 
    allcart: { type: Schema.Types.ObjectId, ref: 'AddToCart' },
});

module.exports = mongoose.model('AllAddCart', allAddToCartSchema);