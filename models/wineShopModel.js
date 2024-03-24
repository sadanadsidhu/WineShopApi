const mongoose = require("mongoose");

const wineShopSchema = new mongoose.Schema({
    ShopName: {
        type: String,
        required: true,
    },
    latitude: Number,
    longitude: Number,
    availableItems: [{
        subId: Number,
        category: String,
        name: String,
        image: String,
    }]
});

const WineShop = mongoose.model("WineShop", wineShopSchema);

module.exports = WineShop;
