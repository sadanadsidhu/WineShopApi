// const mongoose = require('mongoose'); 
// const CustomerDetails = mongoose.model('Customerdetails');
const CustomerAadhaDetails = require('../models/aadharFetchDataModel');


const createAadharDetails = async (req, res) => {
    try {
      const { D_O_Birth, address, aadharNumber } = req.body;
      const newAadharDetail = new CustomerAadhaDetails({
        D_O_Birth,
        address,
        aadharNumber
      });
      await newAadharDetail.save();
      return res.status(201).json(newAadharDetail);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };

const getAadharDetails = async (req, res) => {
  try {
    const aadharDetails = await CustomerAadhaDetails.find();
    return res.status(200).json(aadharDetails);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
createAadharDetails,
getAadharDetails
};
