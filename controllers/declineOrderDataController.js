const DeclineOrder=require("../models/declineOrderDataModel")


const addDeclineOrder = async (req, res) => {
    try {
        const { declineOrderId,shopId } = req.body;

        // Create a new AcceptAndDeclineOrder document with the decline order
        const newAcceptAndDeclineOrder = new DeclineOrder({
            declineOrder: declineOrderId,
            shopId:shopId
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


const getAcceptOrders = async (req, res) => {
    const { shopId } = req.params;
    try {
        // Find orders based on the shopId
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

module.exports={
    addDeclineOrder,
    getAcceptOrders
}