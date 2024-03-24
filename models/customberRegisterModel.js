const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true
  },
  localAddress: { 
    type: String, 
    required: true 
  },
  permanentAddress:{
     type: String, 
     required: false 
    }
});
const Category = mongoose.model('Customer', CustomerSchema);

module.exports = Category;