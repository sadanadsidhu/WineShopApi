const WineShop = require('../models/wineShopModel');

// Create WineShop
const createWineShop = async (req, res) => {
    try {
        const { ShopName, latitude, longitude,images } = req.body;

        // Create a new WineShop instance
        const newWineShop = new WineShop({
            ShopName,
            latitude,
            longitude,
            images
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
        const { ShopName, latitude, longitude,images } = req.body;

        const updatedWineShop = await WineShop.findByIdAndUpdate(id, { ShopName, latitude, longitude,images }, { new: true });

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
        const wineShops = await WineShop.find();
        res.status(200).json(wineShops);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    createWineShop,
    updateWineShop,
    getAllWineShops
};

