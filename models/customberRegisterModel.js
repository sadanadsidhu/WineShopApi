const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const addressSchema = new Schema({
  houseFlatBlockNo: {
    type: Number,
    required: true,
  },
  apartmentRoadArea: {
    type: String,
    required: true,
  },
  pinCode: {
    type: Number,
    required: true,
  },
  landmark: {
    type: String,
    required: true,
  },
  lognitude: {
    type: Number,
    required: false,
  },
  latitude: {
    type: Number,
    required: false,
  },
});
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
    type: addressSchema,
    required: false,
  },
});

const Customer = mongoose.model("Customer", CustomerSchema);

module.exports = Customer;
