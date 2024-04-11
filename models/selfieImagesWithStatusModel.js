const mongoose=require('mongoose');
const Otp = require('../models/userOtpVarificationModel');
const Schema = mongoose.Schema;

const selfieSchema=new mongoose.Schema({
images:{
    type:String,
    required:true
},
status:{
    type: Boolean,
    default:false
},
// mobileNumber: {
//     type: mongoose.Schema.Types.ObjectId, // Reference to the Otp model
//     ref: 'Otp' // Reference the name of the Otp model
// }
mobileNumber: {
    type: String, // Change the type to String
    required: true
}

})
module.exports=mongoose.model('UserSelfie',selfieSchema); 