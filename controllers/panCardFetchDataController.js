const PanCardDetails = require('../models/panCardFetchDataModel');

// Create PAN card details
const createPanCardDetails = async (req, res) => {
  try {
    const { panCardNumber, D_O_Birth, age } = req.body;
    
    // Check if the PAN card number already exists
    const existingPanCard = await PanCardDetails.findOne({ panCardNumber });
    if (existingPanCard) {
      return res.status(400).json({ error: "PAN card number already exists" });
    }

    // Create new PAN card details
    const newPanCardDetails = await PanCardDetails.create({
      panCardNumber,
      D_O_Birth,
      age
    });

    return res.status(200).json({ message: "PAN card details created successfully", panCardDetails: newPanCardDetails });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get all PAN card details
const getPanCardDetails = async (req, res) => {
  try {
    const allPanCardDetails = await PanCardDetails.find();
    return res.status(200).json({ panCardDetails: allPanCardDetails });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createPanCardDetails,
  getPanCardDetails
};
