const AllCustomerAndProductData = require('../models/allCustomerAndProductDataModel');
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;
const socketIo = require('socket.io');
const express = require('express');

const app = express();
const server = require('http').createServer(app);
const io = socketIo(server);

app.use(express.json());

// // WebSocket server logic
// const io = require('socket.io')(2020); // Example port

io.on('connection', (socket) => {
    console.log('Client connected');

    // Log any received message
    socket.onAny((event, ...args) => {
        console.log(`Received event: ${event}`);
        console.log(`Received data: ${JSON.stringify(args)}`);
    });

    // Example: Listen for data creation event
    socket.on('dataCreated', () => {
        // Emit event to all connected clients
        io.emit('newData', { message: 'New data created', timestamp: Date.now() });
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});
// io.on('connection', (socket) => {
//     console.log('Client connected');

//     // Example: Listen for data creation event
//     socket.on('dataCreated', () => {
//         // io.emit('newData'); // Emit event to all connected clients
//         io.emit('newData', { message: 'New data created', timestamp: Date.now() }); });

//     socket.on('disconnect', () => {
//         console.log('Client disconnected');
//     });
// });
 /////// GENERATE OREDER ID FOR EVERY ORDERID CREATE NEW ID ///////////////////////////////////////////
const generateOrderId = () => {
    const min = 100000; // Minimum six-digit number (100000)
    const max = 999999; // Maximum six-digit number (999999)
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
const createAllCustomerAndProductData = async (req, res) => {
    try {
        const requestData = req.body;
           
        const orderId = generateOrderId();

        requestData.orderId = orderId;

        const createdData = await AllCustomerAndProductData.create({ dataArray: requestData,orderId: orderId });
        io.emit('dataCreated'); // Emit event when data is created
        res.status(201).json({ success: true, message: 'Data created successfully', orderId: orderId, data: createdData });
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

        const dataWithOrderId = allData.map(data => {
            return {
                orderId: data.dataArray.orderId,
                dataArray: data.dataArray
            };
        });
                  
        // Return the populated data with orderId included in the response
        return res.status(200).json({ code: 200, message: 'Data retrieved successfully.', data: dataWithOrderId });
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

const getAllCustomerDataByOrderId = async (req, res) => {
    const { orderId } = req.params;
    try {
        // Find documents that match the orderId
        const data = await AllCustomerAndProductData.findOne({ orderId: orderId }).populate('dataArray.productId dataArray.shopId');
        if (!data) {
            return res.status(404).json({ message: 'Data not found for the provided orderId' });
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
    const { arrayId } = req.params;
    try {
        // Delete document by matching the _id
        const deletedData = await AllCustomerAndProductData.findOneAndDelete({ "dataArray._id": arrayId });

        if (!deletedData) {
            return res.status(404).json({ message: 'Data not found' });
        }

        res.status(200).json({ success: true, message: 'Data deleted successfully', data: deletedData });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
};


// const deleteCustomerAndProductDataById = async (req, res) => {
//     const { dataId, arrayId } = req.params; // Separate the parent document _id (dataId) and the array element _id (arrayId)
//     try {
//         // Delete the array element by matching both the parent document _id and the array element _id
//         const deletedData = await AllCustomerAndProductData.updateOne(
//             { _id: dataId }, // Match the parent document _id
//             { $pull: { dataArray: { _id: arrayId } } } // Remove the array element with the given _id
//         );

//         if (!deletedData) {
//             return res.status(404).json({ message: 'Data not found' });
//         }

//         res.status(200).json({ success: true, message: 'Data deleted successfully', data: deletedData });
//     } catch (error) {
//         res.status(500).json({ success: false, message: 'Server error', error: error.message });
//     }
// };



module.exports = {
    createAllCustomerAndProductData,
    getAllCustomerAndProductData,
    getAllCustomerDataByShopId,
    getAllCustomerDataByOrderId,
    deleteAllCustomerAndProductData,
    deleteCustomerAndProductDataById
};

