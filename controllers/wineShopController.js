const WineShop = require('../models/wineShopModel');
const SubWineCategory=require('../models/wineSubCategoriesModel')

////////////////////////////////CALCULATION DISTANCE OF WINESHOP WITHIN 5 KM FROM CURRENT LOCATION/////////////
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * Math.PI / 180;  // convert degrees to radians
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
        Math.sin(dLon/2) * Math.sin(dLon/2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    const distance = R * c; // Distance in km
    return distance;
}

// Route handler to get wine shops within 5 km of current location
const getWineShopsWithin5km = async (req, res) => {
    try {
        // Assuming current location coordinates are provided in request body
        const { currentLat, currentLon } = req.body;
        
        // Fetch all wine shops from the database
        const wineShops = await WineShop.find();

        // Filter wine shops within 5 km of the current location
        const wineShopsWithin5km = wineShops.filter(wineShop => {
            const distance = calculateDistance(currentLat, currentLon, wineShop.latitude, wineShop.longitude);
            return distance <= 5; // Filter wine shops within 5 km
        });

        res.status(200).json(wineShopsWithin5km);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Create WineShop
const createWineShop = async (req, res) => {
    try {
        const { ShopName, latitude, longitude,images,availableCategory } = req.body;

        // Create a new WineShop instance
        const newWineShop = new WineShop({
            ShopName,
            latitude,
            longitude,
            images,
            availableCategory
        });

        // Save the wine shop to the database
        const savedWineShop = await newWineShop.save();

        res.status(201).json(savedWineShop);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Update WineShop
const updateWineShop = async (req, res) => {
    try {
        const { id } = req.params;
        const { ShopName, latitude, longitude, images, availableCategory } = req.body;

        const updatedWineShop = await WineShop.findByIdAndUpdate(
            id,
            { ShopName, latitude, longitude, images, availableCategory },
            { new: true }
        ).populate('availableCategory');

        if (!updatedWineShop) {
            return res.status(404).json({ message: 'WineShop not found' });
        }

        res.status(200).json(updatedWineShop);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


// Get all WineShops
const getAllWineShops = async (req, res) => {
    try {
        const wineShops = await WineShop.find().populate('availableCategory');
        res.status(200).json(wineShops);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    getWineShopsWithin5km,
    createWineShop,
    updateWineShop,
    getAllWineShops
};

