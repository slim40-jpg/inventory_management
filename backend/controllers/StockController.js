const e = require('express');
const StockModel = require('../models/StockModel'); 

const addStock = async (req, res) => {
    try {
        
        const stock = new StockModel(req.body);
        await stock.save();
        res.status(201).json({ success: true, data: stock });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
const getStockById = async (req, res) => {
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
const updateStock = async (req, res) => {
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
const deleteStock = async (req, res) => {
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
module.exports = {
    updateStock,
    deleteStock,
    addStock,
    getStockById
}
