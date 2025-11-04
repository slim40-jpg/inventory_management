const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');

const auth = async (req , res , next) => {
     const token = req.header('Authorization')?.replace  
};