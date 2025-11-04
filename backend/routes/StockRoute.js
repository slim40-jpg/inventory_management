const express = require('express');
const router = express.Router();

// Example route
router.get('/list', (req, res) => {
  res.json({ message: 'Stock route works' });
});

module.exports = router;
