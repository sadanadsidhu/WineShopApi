
const ConfirmOrder = require('../models/confirmedOrderArrayModel');
const AllDeliveryBoyRegisterData = require('../models/deliverBoyRegistrationModel');
const Product = require('../models/wineSubCategoriesModel');
const Shop = require('../models/wineShopModel');
const addConfirmOrder = async (req, res) => {
    try {
        const { confirmOrderId, delevaryBoyId } = req.body;

        const newConfirmOrder = new ConfirmOrder({
            confirmOrder: confirmOrderId,
            delevaryBoyId: delevaryBoyId
        });

        await newConfirmOrder.save();

        res.status(201).json({
            message: 'Confirm order added successfully',
            confirmOrder: confirmOrderId,
            delevaryBoyId: delevaryBoyId
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// const getConfirmOrders = async (req, res) => {
//     const { delevaryBoyId } = req.params;
//     try {
//         const orders = await ConfirmOrder.find({ delevaryBoyId: delevaryBoyId })
//             .populate('confirmOrder')  // Ensure 'Order' model exists
//             .populate('delevaryBoyId'); // Correct reference to 'AllDeliveryBoyRegisterData'

//         if (!orders || orders.length === 0) {
//             return res.status(404).json({ message: 'Data not found' });
//         }

//         res.json({ orders: orders });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Server Error' });
//     }
// };

const getConfirmOrders = async (req, res) => {
    const { delevaryBoyId } = req.params;
    try {
        const orders = await ConfirmOrder.find({ delevaryBoyId })
            .populate({
                path: 'confirmOrder',
                populate: [
                    { path: 'productDetails', model: 'SubWineCategory' },
                    { path: 'shopDetails', model: 'WineShop' }
                ]
            })
            .populate('delevaryBoyId'); // Ensure 'AllDeliveryBoyRegisterData' model exists

        if (!orders || orders.length === 0) {
            return res.status(404).json({ message: 'Data not found' });
        }

        res.json({ orders });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    addConfirmOrder,
    getConfirmOrders
};
