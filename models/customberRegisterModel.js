// const mongoose = require('mongoose');
// const jwt = require('jsonwebtoken');
// require('dotenv').config();
// const CustomerSchema = new mongoose.Schema({
//   username: { 
//     type: String, 
//     required: true 
//   },
//   email: { 
//     type: String, 
//     required: true
//   },
//   localAddress: { 
//     type: String, 
//     required: false 
//   },
//   permanentAddress:{
//      type: String, 
//      required: false 
//     },
//     status:{
//       type:String,
//       default:"numbervarified"
//     },
//   refreshToken:{
//       type:String,
//       required:true
      
//     }
    
// });
// CustomerSchema.methods.generateAccessToken = function(){
//   return jwt.sign(
//       {
//           _id: this._id,
//           email: this.email,
//           username: this.username,
//       },
//       process.env.ACCESS_TOKEN_SECRET,
//       {
//           expiresIn: process.env.ACCESS_TOKEN_EXPIRY
//       }
//   )
// }
// CustomerSchema.methods.generateRefreshToken = function(){
//   return jwt.sign(
//       {
//           _id: this._id,
          
//       },
//       process.env.REFRESH_TOKEN_SECRET,
//       {
//           expiresIn: process.env.REFRESH_TOKEN_EXPIRY
//       }
//   )
// }
// const Category = mongoose.model('Customer', CustomerSchema);

// module.exports = Category;

const mongoose = require("mongoose");
const Schema = mongoose.Schema; // Import the Schema object
const jwt = require("jsonwebtoken");
require("dotenv").config();

const CustomerSchema = new Schema({
  mobileNumber: {
    type: Number,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  localAddress: {
    type: String,
    required: false,
  },
  permanentAddress: {
    type: String,
    required: false,
  },
  refreshToken: {
    type: String,
  },
});

CustomerSchema.methods.generateAccessToken = function () {
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

CustomerSchema.methods.generateRefreshToken = function () {
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

const Customer = mongoose.model("Customer", CustomerSchema);

module.exports = Customer;