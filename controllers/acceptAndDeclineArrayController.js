const AcceptAndDeclineOrder = require('../models/acceptAndDeclineArrayModel');
const AllCustomerAndProductData = require('../models/allCustomerAndProductDataModel');

//////////////////////////////Add Accept order //////////////////////////////////////////////////
const addAcceptOrder = async (req, res) => {
    try {
        const { acceptOrderId } = req.body;

        // Create a new AcceptAndDeclineOrder document with the accept order
        const newAcceptAndDeclineOrder = new AcceptAndDeclineOrder({
            acceptOrder: acceptOrderId
        });

        // Save the new document to the database
        await newAcceptAndDeclineOrder.save();

        res.status(201).json({ message: 'Accept order added successfully',
        acceptOrder: acceptOrderId
    });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

//////////////////Add Decline Order //////////////////////////////////////////////////////////
const addDeclineOrder = async (req, res) => {
    try {
        const { declineOrderId } = req.body;

        // Create a new AcceptAndDeclineOrder document with the decline order
        const newAcceptAndDeclineOrder = new AcceptAndDeclineOrder({
            declineOrder: declineOrderId
        });

        // Save the new document to the database
        await newAcceptAndDeclineOrder.save();

        res.status(201).json({ message: 'Decline order added successfully',
        declineOrder: declineOrderId
    });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};
////////////////////////get AcceptOrder///////////////////////////////////////////////////
const getAcceptOrders = async (req, res) => {
    const { shopId } = req.params;
    try {
        const orders = await AcceptAndDeclineOrder.find().populate('acceptOrder');
        const data = await AllCustomerAndProductData.find({ 'dataArray.shopId': shopId });
        if (!data || data.length === 0) {
            return res.status(404).json({ message: 'Data not found' });
        }
        const responseData = { data: data, orders: orders }; // Combine data and orders into a single object
        res.json(responseData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

////////////////////////////get decline order ////////////////////////////////////////////////////
const getDeclineOrders = async (req, res) => {
    const { shopId } = req.params;
    try {
        const data = await AllCustomerAndProductData.find({ 'dataArray.shopId': shopId });
        const orders = await AcceptAndDeclineOrder.find().populate('declineOrder');
        if (!data || data.length === 0) {
            return res.status(404).json({ message: 'Data not found' });
        }
        const responseData = { data: data, orders: orders }; // Combine data and orders into a single object
        res.json(responseData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports={
    addAcceptOrder,
    addDeclineOrder,
    getAcceptOrders,
    getDeclineOrders
}