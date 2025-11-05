const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');
const express = require('express');
const app = express();
const permissions = [String , String];

const auth = async (req , res , next) => {
     let token;
     const SECRETKEY = process.env.JWT_SECRET || "skmdpcdpd4525";
     console.log("req.header" , req.method)
     if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
          token = req.headers.authorization.split(" ")[1];
     }

     if (!token) {
          res.status(401).json({
               success: false,
               message: "token introuvable",
          });

     }
     else {
          const decoded = jwt.verify(token , SECRETKEY);
          if(!decoded) {
               res.status(401).json({
                    success: false,
                    message: "token invalid",
               });
          }
          else {
               req.user = User.findById(decoded.id);
               
               next();
          };

     }
};

module.exports = auth;