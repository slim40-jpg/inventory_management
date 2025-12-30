const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');
//const { refreshToken } = require('../controllers/RefreshTokenController');

// Example route
router.post('/login', AuthController.login )
router.post('/SignUp' ,AuthController.register);
//router.post('/refresh', refreshToken);
router.post('/logout', AuthController.logout);



module.exports = router;
