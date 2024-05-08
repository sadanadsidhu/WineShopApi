const mongoose = require('mongoose')
const { Schema } = mongoose;

const addToCartSchema = new Schema({
    quantity:{
        type:Number,
        require:true
    },
    totalPrice:{ 
        type:Number,
        require:true
    },
    ml:{
        type:Number,
        require:true
    },
    cart: { 
        type: Schema.Types.ObjectId, 
        ref: 'SubWineCategory' 
    },
    // mobileNumber :{
    //     type:Number, 
    //     required:true,
    // }
});

module.exports = mongoose.model('AddToCart', addToCartSchema);