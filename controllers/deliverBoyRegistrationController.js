const AllDeliveryBoyRegisterData = require('../models/deliverBoyRegistrationModel');

/////////////////////////// POST REGISTER DATA /////////////////////////////////////////////////////////
const registerDeliveryBoy = async (req, res) => {
    try {
        // Extract the required data from the request body
        const { name, mobileNumber, age, address, aadhaarCardNumber,latitude, longitude, aadharImage, selfieImages } = req.body;

        // Create a new instance of the model with the extracted data
        const newDeliveryBoy = new AllDeliveryBoyRegisterData({
            name,
            mobileNumber,
            age,
            address,
            aadhaarCardNumber, 
            latitude,
            longitude,
            aadharImage,
            selfieImages
        });

        // Save the new delivery boy to the database
        await newDeliveryBoy.save();

        // Send the response
        res.status(201).json({ message: 'Delivery boy registered successfully', data: newDeliveryBoy });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};


/////////////////////////////////// GET REGISTER DATA ///////////////////////////////////////////////////
const getAllDeliveryBoys = async (req, res) => {
    try {
        const deliveryBoys = await AllDeliveryBoyRegisterData.find();
        res.status(200).json(  deliveryBoys );
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

////////////////////////////////// GET REGISTER DATA BY ID /////////////////////////////////////////////
const getDeliveryBoyById = async (req, res) => {
    try {
        const deliveryBoy = await AllDeliveryBoyRegisterData.findById(req.params.id);
        if (!deliveryBoy) {
            return res.status(404).json({ message: 'Delivery boy not found' });
        }
        res.status(200).json({ data: deliveryBoy });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

//////////////////////////////////////// DELETE REGISTER DATA //////////////////////////////////////////
const deleteDeliveryBoyById = async (req, res) => {
    try {
        const deletedDeliveryBoy = await AllDeliveryBoyRegisterData.findByIdAndDelete(req.params.id);
        if (!deletedDeliveryBoy) {
            return res.status(404).json({ message: 'Delivery boy not found' });
        }
        res.status(200).json({ message: 'Delivery boy deleted successfully', data: deletedDeliveryBoy });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

//////////////////////////////////////// UPDATE REGISTER DATA //////////////////////////////////////////
const updateDeliveryBoyById = async (req, res) => {
    try {
        const updatedDeliveryBoy = await AllDeliveryBoyRegisterData.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedDeliveryBoy) {
            return res.status(404).json({ message: 'Delivery boy not found' });
        }
        res.status(200).json({ message: 'Delivery boy updated successfully', data: updatedDeliveryBoy });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    registerDeliveryBoy,
    getAllDeliveryBoys,
    getDeliveryBoyById,
    deleteDeliveryBoyById,
    updateDeliveryBoyById
};
