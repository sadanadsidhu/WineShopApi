const { response } = require('express');
const axios = require('axios');
const OtpModel = require('../models/userOtpVarificationModel');
// const Otp = require('../models/userOtpVarificationModel');
const UserSelfie = require('../models/selfieImagesWithStatusModel');
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
    const otp = otpGenerator.generate(4, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
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
        otpExpiration: new Date(cDate.getDate()),
      });
      await newOtpDoc.save();
    }

    // Send OTP via API
    const apiUrl = `https://bulksmsby.in/api/api.php?apikey=${process.env.BULKSMS_API_KEY}&to=${mobileNumber}&senderid=${process.env.BULKSMS_SENDER_ID}&msg=Thanks for payment Rs ${otp} for {%23var%23} - TDR SOFTWARE PVT LTD&templateID=${process.env.BULKSMS_TEMPLET_ID}`;
    const response = await axios.get(apiUrl);
    if (response.status === 200) {
      return res.status(200).json({
        success: true,
        msg: "OTP sent successfully!",
        mobileNumber: otpDoc.mobileNumber,
        otp: otpDoc.otp,
      });
    } else {
      throw new Error("Failed to send OTP via API.");
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: error.message,
    });
  }
};


// const verifyOtp = async (req, res) => {
//   try {
//     const { otp, mobileNumber,status } = req.body;
//     const otpDoc = await OtpModel.findOne({ otp, mobileNumber}).exec();

//     if (!status) {
//       return res.status(400).json({ message: 'Please provide categoryId' });
//   }

//   // Check if the referenced category exists
//   const statusUser = await UserSelfie.findById(status);
//   if (!statusUser) {
//       return res.status(404).json({ message: 'Category not found' });
//   }
    
//     if (otpDoc) {
//       const currentTime = new Date();
//       if (currentTime > otpDoc.otpExpiration) {

//         await statusUser.save();
//         // Generate access and refresh tokens
//         const { accessToken, refreshToken } = await generateAccessAndRefreshToken(otpDoc._id);

//         // Set options for cookies
//         const options = {
//           httpOnly: true,  
//           secure: true,   
//         };
//         return res.status(200)      
//           .cookie("accessToken", accessToken, options)
//           .cookie("refreshToken", refreshToken, options)
//           .json({
//             success: true,
//             msg: "Otp verify successfully and Access Token and Refresh token created",
//             accessToken,
//             refreshToken
//           });
//       } else {
//         // OTP has expired
//         return res.status(400).json({
//           success: false,
//           msg: "OTP has expired. Please request a new one.",
//         });
//       }
//     } else {
//       // Invalid OTP or mobile number
//       return res.status(400).json({
//         success: false,
//         msg: 'Invalid OTP or mobile number.'
//       });
//     }
//   } catch (error) {
//     // Handle any unexpected errors
//     return res.status(500).json({
//       success: false,
//       msg: error.message,
//     });
//   }
// };

const verifyOtp = async (req, res) => {
  try {
    const { otp, mobileNumber,statusID } = req.body;
    const otpDoc = await OtpModel.findOne({ otp, mobileNumber }).exec();

    if (!statusID ) {
      return res.status(400).json({ message: 'Please provide categoryId' });
    }

    // Check if the referenced category exists
    let statusUser = await UserSelfie.findById(statusID );
    if (!statusUser) {
      return res.status(404).json({ message: 'Category not found' });
    }
    if (otpDoc) {
      const currentTime = new Date();
      if (currentTime > otpDoc.otpExpiration) {
        // Update statusUser
        statusUser.status = !statusUser.status; // Toggle status
        await statusUser.save();
        const userId = statusUser._id;
        // Generate access and refresh tokens
        const { accessToken, refreshToken } = await generateAccessAndRefreshToken(otpDoc._id);

        // Set options for cookies
        const options = {
          httpOnly: true,
          secure: true,
        };
        return res.status(200)
          .cookie("accessToken", accessToken, options)
          .cookie("refreshToken", refreshToken, options)
          .json({
            success: true,
            msg: "Otp verify successfully and Access Token and Refresh token created",
            accessToken,
            refreshToken,
            statusUser,
            userId
          });
      } else {
        // OTP has expired
        return res.status(400).json({
          success: false,
          msg: "OTP has expired. Please request a new one.",
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
      msg: error.message,
    });
  }
};

// const verifyOtp = async (req, res) => {
//   try {
//     const { otp, mobileNumber, status } = req.body;
//     const otpDoc = await OtpModel.findOne({ otp, mobileNumber }).exec();

//     if (!statusUser) {
//             return res.status(400).json({ message: 'Please provide categoryId' });
//           }

//     let statusUser;
//     if (status === 'false') { // Assuming status is a boolean represented as a string
//       statusUser = true;
//     } else if (status === 'true') {
//       statusUser = false;
//     } else {
//       // If status is not a boolean string, it might be an ObjectId
//       // Convert it to ObjectId
//       statusUser = mongoose.Types.ObjectId(status);
//     }

//     // Now you can query the database using statusUser
//     const user = await UserSelfie.findById(statusUser);
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }


//     // Generate access and refresh tokens
//     const userId = statusUser._id; // Get the user ID
//     const { accessToken, refreshToken } = await generateAccessAndRefreshToken(otpDoc._id, userId); // Pass userId to token generation function

//     // Set options for cookies
//     const options = {
//       httpOnly: true,
//       secure: true,
//     };
//     return res.status(200)
//       .cookie("accessToken", accessToken, options)
//       .cookie("refreshToken", refreshToken, options)
//       .json({
//         success: true,
//         msg: "Otp verify successfully and Access Token and Refresh token created",
//         accessToken,
//         refreshToken,
//         statusUser,
//         userId // Include userId in the response
//       });
//   } catch (error) {
//     // Handle any unexpected errors
//     return res.status(500).json({
//       success: false,
//       msg: error.message,
//     });
//   }
// };


// const getAllMobileNumbers = async (req, res) => {
//   try {
//     const otpDocuments = await OtpModel.find({}, 'mobileNumber');
//     const mobileNumbers = otpDocuments.map(doc => doc.mobileNumber);
//     return res.status(200).json({
//       success: true,
//       mobileNumbers: mobileNumbers
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       msg: error.message
//     });
//   }
// }

const getMobileNumberStatus = async (req, res) => {
  try {
    const { mobileNumber } = req.params;
    const otpDocument = await OtpModel.findOne({ mobileNumber }, 'status'); // Select only the status field
    if (!otpDocument) {
      return res.status(404).json({
        success: false,
        msg: "Mobile number not found"
      });
    }
    return res.status(200).json({
      success: true,
      mobileNumber: mobileNumber,
      status: otpDocument.status
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: error.message
    });
  }
};

module.exports = {
  sendOtp,
  verifyOtp,
  getMobileNumberStatus
};

