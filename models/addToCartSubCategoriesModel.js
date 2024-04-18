// const mongoose = require('mongoose')
// const { Schema } = mongoose;

// const userSchema = new Schema({
//     url: { type: String },
//     type: String,
//     name: String,
//     password: String,
//     cart: [{ type: Schema.Types.ObjectId, ref: 'products' }],
//     roles: [{ type: String, ref: 'roles' }],
// });

// module.exports = mongoose.model('users', userSchema);
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
        // enum: ['180 ml', '375 ml', '750 ml', '1000 ml', '1500 ml'],
        require:true
    },
    cart: { 
        type: Schema.Types.ObjectId,
         ref: 'SubWineCategory', 
         require:true
         }
});

module.exports = mongoose.model('AddToCart', addToCartSchema);