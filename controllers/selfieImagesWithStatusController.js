// controllers/selfieController.js

const UserSelfie = require('../models/selfieImagesWithStatusModel');
const OtpModel = require('../models/userOtpVarificationModel');


// Get all selfies
const getAllSelfies = async (req, res) => {
  try {
    const selfies = await UserSelfie.find();
    res.status(200).json({ success: true, data: selfies });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Create a new selfie
const createSelfie = async (req, res) => {
    try {
      const { images } = req.body;
      const newSelfie = await UserSelfie.create({ images });
  
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
