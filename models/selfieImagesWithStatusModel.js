const mongoose=require('mongoose');
const OtpModel = require('../models/userOtpVarificationModel');
const Schema = mongoose.Schema;

const selfieSchema=new mongoose.Schema({

images:{
    type:String,
    required:true
},

status:{
    type: String,
    ref: 'Otp',
    default:false
},

})
module.exports=mongoose.model('UserSelfie',selfieSchema); 