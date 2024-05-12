const DeclineOrder = require("../models/declineOrderDataModel");
const WineShop = require("../models/wineShopModel");
// Function to add a decline order
// const addDeclineOrder = async (req, res) => {
//     try {
//         const { declineOrderId, shopId } = req.body; // Use "declineOrderId" instead of "acceptOrderId"

//         // Create a new DeclineOrder document with the decline order
//         const newDeclineOrder = new DeclineOrder({
//             declineOrder: declineOrderId, // Use "declineOrderId"
//             shopId: shopId
//         });

//         // Save the new document to the database
//         await newDeclineOrder.save();

//         res.status(201).json({ message: 'Decline order added successfully', declineOrder: declineOrderId });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Server Error' });
//     }
// };

function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180; // Convert degrees to radians
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers
    return distance;
}
const addDeclineOrder = async (req, res) => {
    try {
        const { declineOrderId, shopId } = req.body;

        // Create a new DeclineOrder document with the decline order
        const newDeclineOrder = new DeclineOrder({
            declineOrder: declineOrderId,
            shopId: shopId
        });

        // Save the new document to the database
        await newDeclineOrder.save();

        // Fetch the coordinates of the target shop
        const targetShop = await WineShop.findById(shopId);
        const targetLatitude = targetShop.latitude;
        const targetLongitude = targetShop.longitude;

        // Query all WineShop documents
        const allShops = await WineShop.find({});

        // Calculate distances and filter nearby shops
        const nearbyShops = allShops.filter(shop => {
            const distance = calculateDistance(targetLatitude, targetLongitude, shop.latitude, shop.longitude);
            return distance <= 5; // MAX_DISTANCE is your defined maximum distance
        });

        // Choose the nearest shop
        if (nearbyShops.length > 0) {
            const nearestShop = nearbyShops[0];
            // Implement logic to forward the decline order to the nearest shop
            console.log(`Order declined, forwarding to nearby wine shop with ID: ${nearestShop._id}`);
        } else {
            console.log("No nearby wine shops found.");
        }

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
