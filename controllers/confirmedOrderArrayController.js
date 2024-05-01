const ConfirmOrder = require('../models/confirmedOrderArrayModel');

const addConfirmOrder = async (req, res) => {
    try {
        const { confirmOrderId,delevaryBoyId } = req.body;

        // Create a new ConfirmOrder document with the provided data
        const newConfirmOrder = new ConfirmOrder({
            confirmOrder: confirmOrderId,
            // shopId: shopId,
            delevaryBoyId: delevaryBoyId
        });

        // Save the new document to the database
        await newConfirmOrder.save();

        res.status(201).json({ 
            message: 'Confirm order added successfully',
            confirmOrder: confirmOrderId,
            // shopId: shopId,
            delevaryBoyId: delevaryBoyId
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};
/////////////////////////////////get confirm order //////////////////////////////////////////////////////
const getConfirmOrders = async (req, res) => {
    const { shopId } = req.params;
    try {
        // Find orders based on the shopId
        const orders = await ConfirmOrder.find({ shopId: shopId }).populate('confirmOrder delevaryBoyId');
        
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
     addConfirmOrder,
     getConfirmOrders
     };
