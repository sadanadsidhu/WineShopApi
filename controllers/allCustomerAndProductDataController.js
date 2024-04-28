const AllCustomerAndProductData = require('../models/allCustomerAndProductDataModel');
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

const createAllCustomerAndProductData = async (req, res) => {
    try {
        const requestData = req.body;
        const createdData = await AllCustomerAndProductData.create({ dataArray: requestData });
        res.status(201).json({ success: true, message: 'Data created successfully', data: createdData });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
};

const getAllCustomerAndProductData = async (req, res) => {
    try {
        // Retrieve all documents from the collection and populate the referenced IDs
        const allData = await AllCustomerAndProductData.find().populate('dataArray.productId dataArray.shopId');
        
        // Check if any data was found
        if (!allData || allData.length === 0) {
            return res.status(404).json({ code: 404, message: 'Data not found' });
        }

        // Return the populated data in the response
        return res.status(200).json({ code: 200, message: 'Data retrieved successfully.', data: allData });
    } catch (error) {
        return res.status(500).json({ code: 500, message: 'Server error', error: error.message });
    }
}
const getAllCustomerDataByShopId = async (req, res) => {
    const { shopId } = req.params;

    try {
        const data = await AllCustomerAndProductData.find({ 'dataArray.shopId': shopId });

        if (!data || data.length === 0) {
            return res.status(404).json({ message: 'Data not found' });
        }

        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};


module.exports = {
    createAllCustomerAndProductData,
    getAllCustomerAndProductData,
    getAllCustomerDataByShopId
};

