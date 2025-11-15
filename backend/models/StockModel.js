const mongoose = require('mongoose');
const CompanyModel = require('./CompanyModel');
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
    CompanyModel
}, {timestamps: true});
module.exports = mongoose.model('Stock' , StockSchema);