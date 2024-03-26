const mongoose = require('mongoose'); 
const categorySchema = new mongoose.Schema({
  id: { 
    type: Number, 
    required: true 
  },
  name: { 
    type: String, 
    required: true
  },
  description: { 
    type: String, 
    required: true 
  },
  image: {
     type: String, 
     required: false 
    }
});

// Create model based on schema
const Category = mongoose.model('Category', categorySchema);

module.exports = Category;