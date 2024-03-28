const mongoose=require('mongoose');
const Schema = mongoose.Schema; // Import the Schema object
const jwt = require("jsonwebtoken");
require("dotenv").config();
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
otpExpiration: {
    type: Date,
    default: () => Date.now() + 10 * 60 * 1000, // Set default value to current time + 10 minutes
    get: (otpExpiration) => otpExpiration.getTime(),
    set: (otpExpiration) => otpExpiration // No need to modify the value when setting
},
refreshToken: {
    type: String,
  },

})

otpSchema.methods.generateAccessToken = function () {
    return jwt.sign(
      {
        _id: this._id,
        email: this.email,
        username: this.username,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
      }
    );
  };
  
  otpSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
      {
        _id: this._id,
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
      }
    );
  };
  

module.exports=mongoose.model('Otp',otpSchema);                                    