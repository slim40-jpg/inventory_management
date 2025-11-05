const mongoose = require('mongoose');
const EntrepriseModel = require('./EntrepriseModel');
const StockSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    quantity: {
        type: Number,
        required: true,
        min: 0
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    entreprise: {
        type: String,
        required: true
    }
}, {timestamps: true});
module.exports = mongoose.model('Stock' , StockSchema);