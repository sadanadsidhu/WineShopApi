const UserSelfie = require('../models/selfieImagesWithStatusModel');
const Otp = require('../models/userOtpVarificationModel');

const getAllSelfies = async (req, res) => {
  try {
    const selfies = await UserSelfie.find().populate('mobileNumber'); // Populate the mobileNumber field
    res.status(200).json({ success: true, data: selfies });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Create a new selfie
const createSelfie = async (req, res) => {
  try {
      const { images, mobileNumber } = req.body; // Extract the mobileNumber from the request body
      const otp = await Otp.findOne({ _id: mobileNumber }); // Find the Otp document using the provided ID
      if (!otp) {
          return res.status(404).json({ success: false, message: 'Otp not found' });
      }
      // Create the UserSelfie document with the images and mobileNumber
      const newSelfie = await UserSelfie.create({ images, mobileNumber: otp.mobileNumber, otp: otp._id });

      // Update status to true
      newSelfie.status = true;
      await newSelfie.save();

      res.status(201).json({ success: true, data: newSelfie });
  } catch (error) {
      res.status(500).json({ success: false, error: error.message });
  }
};



module.exports = {
  getAllSelfies,
  createSelfie
};