const mongoose = require('mongoose');
const Otp = require('../models/userOtpVarificationModel');
const Schema = mongoose.Schema;

const selfieSchema = new mongoose.Schema({
    images: {
        type: String,
        required: true
    },
    statuss: {
        type: Boolean,
        default: false
    },
    mobileNumber: {
        type: String, 
        required: true
    }
});

module.exports = mongoose.model('UserSelfie', selfieSchema);