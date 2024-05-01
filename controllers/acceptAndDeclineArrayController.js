const AcceptAndDeclineOrder = require('../models/acceptAndDeclineArrayModel');
const AllCustomerAndProductData = require('../models/allCustomerAndProductDataModel');

//////////////////////////////Add Accept order //////////////////////////////////////////////////
const addAcceptOrder = async (req, res) => {
    try {
        const { acceptOrderId, shopId } = req.body;

        // Create a new AcceptAndDeclineOrder document with the accept order and shopId
        const newAcceptAndDeclineOrder = new AcceptAndDeclineOrder({
            acceptOrder: acceptOrderId,
            shopId: shopId // Assuming shopId is available in the request body
        }); 

        // Save the new document to the database
        await newAcceptAndDeclineOrder.save();

        res.status(201).json({ 
            message: 'Accept order added successfully',
            acceptOrder: acceptOrderId,
            shopId: shopId // Include shopId in the response
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
        // Find orders based on the shopId
        const orders = await AcceptAndDeclineOrder.find({ shopId: shopId }).populate('acceptOrder');
        if (!orders || orders.length === 0) {
            return res.status(404).json({ message: 'Data not found' });
        }
        res.json({ orders: orders });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};
// const getAcceptOrders = async (req, res) => {
//     const { shopId } = req.params;
//     try {
//         // Find orders based on the shopId and populate the acceptOrder field with only the quantity
//         const orders = await AcceptAndDeclineOrder.find({ shopId: shopId }).populate({
//             path: 'acceptOrder',
//             populate: { path: 'dataArray', select: 'quantity' } // Select only the quantity field
//         });
        
//         if (!orders || orders.length === 0) {
//             return res.status(404).json({ message: 'Data not found' });
//         }
        
//         res.json({ orders: orders });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Server Error' });
//     }
// };


module.exports={
    addAcceptOrder,
    getAcceptOrders,
}