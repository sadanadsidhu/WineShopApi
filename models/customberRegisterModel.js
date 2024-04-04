const mongoose = require("mongoose");
const Schema = mongoose.Schema; // Import the Schema object
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
});

const   Customer = mongoose.model("Customer", CustomerSchema);

module.exports = Customer;