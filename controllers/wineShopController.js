const WineShop = require("../models/wineShopModel");

// const createWineShop = async (req, res) => {
    const createWineShop = async (req, res) => {
        const {
            ShopName,
            latitude,
            longitude,
            availableItems
        } = req.body;
    
        // Validate the request body against the schema
        try {
            const wineShop = new WineShop({
                ShopName,
                latitude,
                longitude,
                availableItems
            });
            
            // Save the wine shop to the database
            const result = await wineShop.save();
            
            res.status(201).json({
                status: "success",
                data: result
            });
        } catch (error) {
            res.status(400).json({
                status: "fail",
                message: error.message
            });
        }
    };
   

const updateWineShop = async (req, res) => {
    try {
        const wineShop = await WineShop.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        res.status(200).json({
            status: "success",
            data: {
                wineShop
            }
        });
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: err.message
        });
    }
};

const getAllWineShops = async (req, res) => {
    try {
        const wineShops = await WineShop.find();
        res.status(200).json({
            status: "success",
            results: wineShops.length,
            data: {
                wineShops
            }
        });
    } catch (err) {
        res.status(500).json({
            status: "fail",
            message: err.message
        });
    }
};

const deleteWineShop = async (req, res) => {
    try {
        await WineShop.findByIdAndDelete(req.params.id);
        res.status(204).json({
            status: "success",
            data: null
        });
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: err.message
        });
    }
};

module.exports = {
    createWineShop,
    updateWineShop,
    getAllWineShops,
    deleteWineShop
};
