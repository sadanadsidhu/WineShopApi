const WineShop = require('../models/wineShopModel');
const SubWineCategory=require('../models/wineSubCategoriesModel')
const CustomerAddress=require('../models/customerCurrentAddressAndPermanentAddressModel')

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

/////////////Route handler to get wine shops within 5 km of current location
const postWineShopsWithin5km = async (req, res) => {
    try {
        // Assuming current location coordinates are provided in request body
        const { currentLat, currentLon } = req.body;
        
        // Fetch all wine shops from the database
        const wineShops = await WineShop.find();

        // Filter wine shops within 100 km of the current location
        const wineShopsWithDistance = wineShops.map(wineShop => {
            const distance = calculateDistance(currentLat, currentLon, wineShop.latitude, wineShop.longitude);
            return { ...wineShop.toObject(), distance }; // Add distance property to each wine shop
        });

        // Filter wine shops within 5 km of the current location
        const wineShopsWithin5km = wineShopsWithDistance.filter(wineShop => {
            return wineShop.distance <= 10000; // Filter wine shops within 100 km
        });

        res.status(200).json(wineShopsWithin5km);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
const getWineShopsWithin5km = async (req, res) => {
    try {
        // Fetch all customers with populated localAddress field
        const customers = await CustomerAddress.find().populate('localAddress');

        // Extract latitude and longitude from the localAddress of the first customer
        const localLat = customers[0].localAddress.latitude;
        const localLon = customers[0].localAddress.lognitude;

        // Fetch all wine shops from the database
        const wineShops = await WineShop.find();

        // Calculate distance between customer's local address and each wine shop
        const wineShopsWithDistance = wineShops.map(wineShop => {
            const distance = calculateDistance(
                localLat, 
                localLon, 
                wineShop.latitude, 
                wineShop.longitude
            );
            console.log('wineShop.latitude', wineShop.latitude);
            console.log('wineShop.longitude', wineShop.longitude);
            console.log('distance', distance)
            return { ...wineShop.toObject(), distance }; // Add distance property to each wine shop
        });
        // Filter wine shops within 5 km of the local address
        const wineShopsWithin5km = wineShopsWithDistance.filter(wineShop => {
            return wineShop.distance >= 5; // Filter wine shops within 5 km
        });
          console.log('wineShopsWithin5km',wineShopsWithin5km)
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

/////////////////////// add available category /////////////////////////////////////////////////////////
const addCategoryToWineShop = async (req, res) => {
    try {
        const { wineShopId, categoryId } = req.body;

        if (!wineShopId || !categoryId) {
            return res.status(400).json({ message: 'WineShop ID and Category ID are required' });
        }

        // Find the WineShop and add the category to the availableCategory array
        const updatedWineShop = await WineShop.findByIdAndUpdate(
            wineShopId,
            { $addToSet: { availableCategory: categoryId } },
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
    postWineShopsWithin5km,
    getWineShopsWithin5km,
    createWineShop,
    addCategoryToWineShop,
    updateWineShop,
    getAllWineShops
};

