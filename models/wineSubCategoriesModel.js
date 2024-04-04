const mongoose = require('mongoose');

const subWineCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  miligram: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  images: {
    type: String,
    required:true
  },
});

module.exports = mongoose.model('SubWineCategory', subWineCategorySchema);