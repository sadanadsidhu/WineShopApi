const AcceptAndDeclineOrder = require('../models/acceptAndDeclineArrayModel');

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

        res.status(201).json({ message: 'Decline order added successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};
////////////////////////get AcceptOrder///////////////////////////////////////////////////
// const getAcceptOrders = async (req, res) => {
//     try {
//         const orders = await AcceptAndDeclineOrder.find().populate('acceptOrder');
//         res.json(orders);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Server Error' });
//     }
// };

const getAcceptOrders = async (req, res) => {
    try {
        const orders = await AcceptAndDeclineOrder.find().populate({
            path: 'acceptOrder', // Specify the field containing the references
            model: 'AcceptAndDeclineOrder' // Specify the model to use for population
        }).exec();

        res.json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};


////////////////////////////get decline order ////////////////////////////////////////////////////
const getDeclineOrders = async (req, res) => {
    try {
        const orders = await AcceptAndDeclineOrder.find().populate('declineOrder');
        res.json(orders);
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