const mongoose = require('mongoose');

const allDeliveryBoyRegisterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    mobileNumber:{
        type: Number,
        required: true,
      },
    age:{
        type:Number,
        required:true,
    },
    address:{
        type:String,
        required:true,
    },
    aadhaarCardNumber:{
        type:Number,
        required:true,
    },
    status:{
        type:String,
        default: 'Not Available',

    },
    latitude:{
        type:Number,
        required:true,
    },
    longitude:{
        type:Number,
        required:true,
    },
    aadharImage:{
        type:String,
        required:true,
    },
    selfieImages:{
        type:String,
        required:true,
    }
});

module.exports = mongoose.model('AllDeliveryBoyRegisterData', allDeliveryBoyRegisterSchema);