const { response } = require('express');
const axios = require('axios');
const OtpModel = require('../models/userOtpVarificationModel');
const jwt = require('jsonwebtoken'); 
require('dotenv').config();
const otpGenerator = require('otp-generator');

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await OtpModel.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    // Generate access token
    const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY });
     // Generate refresh token
    const refreshToken = jwt.sign({ userId: user._id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRY });

    // Update user's refresh token in the database
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    console.error(error);
    throw new Error("Something went wrong");
  }
};
///////////////////////////////////generate otp----------------------->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
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


const verifyOtp = async (req, res) => {
  try {
    const { otp, mobileNumber } = req.body;
    const otpDoc = await OtpModel.findOne({ otp, mobileNumber }).exec();
    
    if (otpDoc) {
      const currentTime = new Date();
      if (currentTime > otpDoc.otpExpiration) {
        // Generate access and refresh tokens
        const { accessToken, refreshToken } = await generateAccessAndRefreshToken(otpDoc._id);

        // Set options for cookies
        const options = {
          httpOnly: true,
          secure: true,
        };

        // Send tokens as cookies in the response
        return res.status(200)      
          .cookie("accessToken", accessToken, options)
          .cookie("refreshToken", refreshToken, options)
          .json({
            success: true,
            msg: "Otp verify successfully and Access Token and Refresh token created",
            accessToken,
            refreshToken
          });
      } else {
        // OTP has expired
        return res.status(400).json({
          success: false,
          msg: 'OTP has expired. Please request a new one.'
        });
      }
    } else {
      // Invalid OTP or mobile number
      return res.status(400).json({
        success: false,
        msg: 'Invalid OTP or mobile number.'
      });
    }
  } catch (error) {
    // Handle any unexpected errors
    return res.status(500).json({
      success: false,
      msg: error.message
    });
  }
}


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

