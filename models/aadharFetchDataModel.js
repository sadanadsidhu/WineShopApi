const mongoose = require('mongoose'); 
const customeraadharDetailSchema = new mongoose.Schema({
  D_O_Birth: { 
    type: String, 
    required: true 
  },
  address: { 
    type: String, 
    required: true
  },
  aadharNumber: { 
    type: String, 
    required: true 
  },
 age:{
    type:Number,
    required:true
 }
});

// Create model based on schema
const Category = mongoose.model('CustomerAadhaDetails', customeraadharDetailSchema);

module.exports = Category;
