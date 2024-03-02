const mongoose = require('mongoose');

const wineSchema = new mongoose.Schema({
    bear: [{
        name: { type: String, required: false },
        price: { type: Number, required: false },
        place: { type: String, required: false }
    }],
    ram: [{
        name: { type: String, required: false },
        price: { type: Number, required: false },
        place: { type: String, required: false }
    }],
    bakadi: [{
        name: { type: String, required: false },
        price: { type: Number, required: false },
        place: { type: String, required: false }
    }]
});

const Wine = mongoose.model('Wine', wineSchema);

module.exports = Wine;

