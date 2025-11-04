const express = require('express');
const router = express.Router();

// Example route
const StockController = require('../controllers/StockController');
router.post('/add', StockController.addStock);
router.get('/get/:id', StockController.getStockById);
router.put('/update/:id', StockController.updateStock);
router.delete('/delete/:id', StockController.deleteStock);  

module.exports = router;
