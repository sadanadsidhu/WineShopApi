// const mongoose=require('mongoose');
// const Schema = mongoose.Schema; // Import the Schema object
// const jwt = require("jsonwebtoken");
// const UserSelfie = require('../models/selfieImagesWithStatusModel');
// require("dotenv").config();
// const otpSchema=new mongoose.Schema({

// mobileNumber:{
//     type:Number,
//     ref:'Customer',
//     required:true,
// },
// otp:{
//     type:String,
//     required:true,
// },
// otpExpiration: {
//     type: Date,
//     default: () => Date.now() + 10 * 60 * 1000, // Set default value to current time + 10 minutes
//     get: (otpExpiration) => otpExpiration.getTime(),
//     set: (otpExpiration) => otpExpiration // No need to modify the value when setting
// },
// refreshToken: {
//     type: String,
//   },
// status:{
//   type:Boolean,
//   default:false
// }

// })

// otpSchema.methods.generateAccessToken = function () {
//     return jwt.sign(
//       {
//         _id: this._id,
//         email: this.email,
//         username: this.username,
//       },
//       process.env.ACCESS_TOKEN_SECRET,
//       {
//         expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
//       }
//     );
//   };
  
//   otpSchema.methods.generateRefreshToken = function () {
//     return jwt.sign(
//       {
//         _id: this._id,
//       },
//       process.env.REFRESH_TOKEN_SECRET,
//       {
//         expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
//       }
//     );
//   };
//   otpSchema.methods.updateStatus = async function () {
//     try {
//         const selfieCount = await selfieSchema.countDocuments({ images: { $exists: true, $ne: null } }).exec();
//         this.status = selfieCount > 0;
//         await this.save();
//         return this;
//     } catch (error) {
//         throw error;
//     }
// };

// module.exports=mongoose.model('Otp',otpSchema);  
// models/otpModel.js
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Schema = mongoose.Schema;
const UserSelfie = require('../models/selfieImagesWithStatusModel'); // Import UserSelfie model
require('dotenv').config();

const otpSchema = new mongoose.Schema({
    mobileNumber: {
        type: Number,
        ref: 'Customer',
        required: true
    },
    otp: {
        type: String,
        required: true
    },
    otpExpiration: {
        type: Date,
        default: () => Date.now() + 10 * 60 * 1000,
        get: (otpExpiration) => otpExpiration.getTime(),
        set: (otpExpiration) => otpExpiration
    },
    refreshToken: {
        type: String,
        required: true
    },
    statusUser:{
      type: Schema.Types.ObjectId,
      ref: 'UserSelfie',
      required:false,
},
});

otpSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    );
};

otpSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    );
};

module.exports = mongoose.model('Otp', otpSchema);
