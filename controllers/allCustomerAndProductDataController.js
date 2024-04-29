const AllCustomerAndProductData = require('../models/allCustomerAndProductDataModel');
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;
const socketIo = require('socket.io');
const express = require('express');

const app = express();
const server = require('http').createServer(app);
const io = socketIo(server);

app.use(express.json());

// WebSocket server logic
io.on('connection', (socket) => {
    console.log('Client connected');

    // Example: Listen for data creation event
    socket.on('dataCreated', () => {
        // io.emit('newData'); // Emit event to all connected clients
        io.emit('newData', { message: 'New data created', timestamp: Date.now() }); });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});


const createAllCustomerAndProductData = async (req, res) => {
    try {
        const requestData = req.body;
        const createdData = await AllCustomerAndProductData.create({ dataArray: requestData });
        io.emit('dataCreated'); // Emit event when data is created
        res.status(201).json({ success: true, message: 'Data created successfully',
         data: createdData,
         });
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
        const data = await AllCustomerAndProductData.find({ 'dataArray.shopId': shopId }).populate('dataArray.productId dataArray.shopId');
        if (!data || data.length === 0) {
            return res.status(404).json({ message: 'Data not found' });
        }
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};

const deleteAllCustomerAndProductData = async (req, res) => {
    try {
        // Delete all documents from the collection
        await AllCustomerAndProductData.deleteMany({});
        res.status(200).json({ success: true, message: 'All data deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
};

const deleteCustomerAndProductDataById = async (req, res) => {
    const { _id } = req.params;
    try {
        // Delete document by matching the productId within the dataArray
        const deletedData = await AllCustomerAndProductData.findOneAndDelete({ 'dataArray.productId': _id });
        if (!deletedData) {
            return res.status(404).json({ message: 'Data not found' });
        }
        res.status(200).json({ success: true, message: 'Data deleted successfully', data: deletedData });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
};


module.exports = {
    createAllCustomerAndProductData,
    getAllCustomerAndProductData,
    getAllCustomerDataByShopId,
    deleteAllCustomerAndProductData,
    deleteCustomerAndProductDataById
};

