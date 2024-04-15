const mongoose = require("mongoose");
const Schema = mongoose.Schema;
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
    },
    images:{
        type:String,
        required:true
    },
    availableCategory: [{
        type: Schema.Types.ObjectId,
        ref: 'SubWineCategory',
        required: true
    }]
});

const WineShop = mongoose.model("WineShop", wineShopSchema);

module.exports = WineShop;
