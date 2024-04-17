const mongoose = require('mongoose'); 
const swiperImagesSchema = new mongoose.Schema({
  images: { 
    type: String, 
    required: true 
  }
 
});
    
module.exports = mongoose.model('SwiperImages', swiperImagesSchema);
