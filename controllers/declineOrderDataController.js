const DeclineOrder = require("../models/declineOrderDataModel");

// Function to add a decline order
const addDeclineOrder = async (req, res) => {
    try {
        const { declineOrderId, shopId } = req.body; // Use "declineOrderId" instead of "acceptOrderId"

        // Create a new DeclineOrder document with the decline order
        const newDeclineOrder = new DeclineOrder({
            declineOrder: declineOrderId, // Use "declineOrderId"
            shopId: shopId
        });

        // Save the new document to the database
        await newDeclineOrder.save();

        res.status(201).json({ message: 'Decline order added successfully', declineOrder: declineOrderId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};


// Function to get decline orders for a specific shopId
const getDeclineOrders = async (req, res) => {
    const { shopId } = req.params;
    try {
        // Find decline orders based on the shopId and populate the 'declineOrder' field
        const orders = await DeclineOrder.find({ shopId: shopId }).populate('declineOrder');
        if (!orders || orders.length === 0) {
            return res.status(404).json({ message: 'Data not found' });
        }
        res.json({ orders: orders });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    addDeclineOrder,
    getDeclineOrders
};
