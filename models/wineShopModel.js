const mongoose = require("mongoose");

const wineShopSchema = new mongoose.Schema({
    ShopName: {
        type: String,
        required: true,
    },
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    }
});

const WineShop = mongoose.model("WineShop", wineShopSchema);

module.exports = WineShop;
