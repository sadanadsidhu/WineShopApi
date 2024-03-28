const mongoose=require('mongoose');
const otpSchema=new mongoose.Schema({

mobileNumber:{
    type:Number,
    ref:'Customer',
    required:true,
},
otp:{
    type:String,
    required:true,
},
otpExpiration:{
    type:Date,
    default:Date.now,
    get:(otpExpiration)=>otpExpiration.getTime(),
    set:(otpExpiration)=>new Date( otpExpiration)
}

})

module.exports=mongoose.model('Otp',otpSchema);                                    