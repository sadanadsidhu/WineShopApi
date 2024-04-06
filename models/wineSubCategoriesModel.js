const mongoose = require('mongoose');
const Schema = mongoose.Schema;
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
  categoryID: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  }

});

module.exports = mongoose.model('SubWineCategory', subWineCategorySchema);