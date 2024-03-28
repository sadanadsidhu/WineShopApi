const dotenv = require("dotenv").config();

const axios = require('axios');
const OtpModel = require('../models/userOtpVarificationModel');
const otpGenerator = require('otp-generator');


const sendOtp = async (req, res) => {
  try {
    const { mobileNumber } = req.body;
    const otp = otpGenerator.generate(4, { upperCaseAlphabets: false, lowerCaseAlphabets: false, specialChars: false });
    const cDate = new Date();

    const otpExpiration = new Date();
    otpExpiration.setMinutes(otpExpiration.getMinutes() + 10);
    const otpDoc = await OtpModel.findOneAndUpdate(
      { mobileNumber },
      { otp, otpExpiration: new Date(cDate.getDate()) },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    ).exec();

    if (!otpDoc) {
      const newOtpDoc = new OtpModel({
        mobileNumber,
        otp,
        otpExpiration: new Date(cDate.getDate())
      });
      await newOtpDoc.save();
    }

    // Send OTP via API
    const apiUrl = `https://bulksmsby.in/api/api.php?apikey=${process.env.BULKSMS_API_KEY}&to=${mobileNumber}&senderid=${process.env.BULKSMS_SENDER_ID}&msg=Thanks for payment Rs ${otp} for {%23var%23} - TDR SOFTWARE PVT LTD&templateID=${process.env.BULKSMS_TEMPLET_ID}`;
    const response = await axios.get(apiUrl);
    if (response.status === 200) {
      return res.status(200).json({
        success: true,
        msg: 'OTP sent successfully!',
        mobileNumber: otpDoc.mobileNumber,
        otp: otpDoc.otp
      });
    } else {
      throw new Error("Failed to send OTP via API.");
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: error.message
    });
  }
}

//////-------------------- veryfi otp------------------------------------------>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

const verifyOtp = async (req, res) => {
  try {
    const { otp, mobileNumber } = req.body;
    const otpDoc = await OtpModel.findOne({ otp, mobileNumber }).exec();
    if (otpDoc) {
      const currentTime = new Date();
      if (currentTime < otpDoc.otpExpiration) {
        return res.status(400).json({
          success: false,
          msg: 'OTP has expired. Please request a new one.'
        });
      }  
      return res.status(200).json({
        success: true,
        msg: 'OTP is valid.'
      });
    } else {
      return res.status(400).json({
        success: false,
        msg: 'Invalid OTP or mobile number.'
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: error.message
    });
  }
}

//////////////////////////get all mobile number--------------->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
const getAllMobileNumbers = async (req, res) => {
  try {
    const otpDocuments = await OtpModel.find({}, 'mobileNumber');
    const mobileNumbers = otpDocuments.map(doc => doc.mobileNumber);
    return res.status(200).json({
      success: true,
      mobileNumbers: mobileNumbers
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: error.message
    });
  }
}
module.exports = {
  sendOtp,
  verifyOtp,
  getAllMobileNumbers
};
