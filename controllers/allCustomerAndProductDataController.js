const AllCustomerAndProductData = require('../models/allCustomerAndProductDataModel');

const createAllCustomerAndProductData = async (req, res) => {
    try {
        const requestData = req.body;
        const createdData = await AllCustomerAndProductData.create(requestData);
        res.status(201).json({ success: true, message: 'Data created successfully', data: createdData });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
};

const getAllCustomerAndProductData = async (req, res) => {
    try {
        const allCustomerAndProductData = await AllCustomerAndProductData.find();
        return res.status(200).json({ code: 200, data: allCustomerAndProductData });
    } catch (error) {
        return res.status(500).json({ code: 500, message: 'Server error', error: error.message });
    }
};

module.exports = {
    createAllCustomerAndProductData,
     getAllCustomerAndProductData 
    };