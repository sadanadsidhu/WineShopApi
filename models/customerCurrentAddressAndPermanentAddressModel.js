const mongoose = require('mongoose')
const { Schema } = mongoose;
const addressSchema = new Schema({
    houseFlatBlockNo: {
      type: String,
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
    description:{
      type: String,
      required: true,
    },
    locationType:{
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

const customerAddresssSchema = new Schema({
    localAddress: {
        type: addressSchema,
        required: true,
      },
    customerPermanentAddress: { type: Schema.Types.ObjectId, ref: 'Customer' },
});

module.exports = mongoose.model('CustomerAddress', customerAddresssSchema);