const e = require('express');
const StockModel = require('../models/StockModel'); 

exports.addStock = async (req, res) => {
    try {
        
        const stock = new StockModel(req.body);
        await stock.save();
        res.status(201).json({ success: true, data: stock });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.getStockById = async (req, res) => {
    try {
        const stock = await StockModel.findById(req.params.id);
        if (!stock) {
            return res.status(404).json({ success: false, message: 'Stock not found' });
        }
        res.status(200).json({ success: true, data: stock });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.updateStock = async (req, res) => {
    try {
        const stock = await StockModel.findByIdAndUpdate(req
.params.id
, req.body, { new: true });
        if (!stock) {
            return res.status(404).json({ success: false, message: 'Stock not found' });
        }
        res.status(200).json({ success: true, data: stock });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.deleteStock = async (req, res) => {
    try {
        const stock = await StockModel.findByIdAndDelete(req.params.id);
        if (!stock) {
            return res.status(404).json({ success: false, message: 'Stock not found' });
        }
        res.status(200).json({ success: true, message: 'Stock deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
