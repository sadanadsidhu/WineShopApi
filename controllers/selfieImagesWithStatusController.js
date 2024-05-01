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
    const { images, mobileNumber } = req.body;

    // const otp = await Otp.findOne({ mobileNumber: mobileNumber }); // Find Otp document

    // if (!otp) {
    //   return res.status(404).json({ success: false, message: 'Otp not found' });
    // }

    // Create UserSelfie with correct status field name (status)
    const newSelfie = await UserSelfie.create({
      images,
      mobileNumber: mobileNumber,
      // otp: otp._id,
      statuss: true, // Set status to true initially
    });

    // Update Otp.statusUser (not recommended due to tight coupling)
    // otp.statusUser = true;
    // await otp.save();

    res.status(201).json({ success: true, data: newSelfie });
  } catch (error) {
    res.status(500).json({ success: false, error: message }); // Include error message
  }
};


module.exports = {
    getAllSelfies,
    createSelfie
};