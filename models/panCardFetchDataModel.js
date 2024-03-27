const mongoose = require('mongoose');

const panCardDetailsSchema = new mongoose.Schema({
  panCardNumber: {
    type: String,
    required: true
  },
  D_O_Birth: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  }
});

const PanCardDetails = mongoose.model('PanCardDetails', panCardDetailsSchema);

module.exports = PanCardDetails;
 