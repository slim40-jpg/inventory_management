const express = require('express');
const route = express.Router();
const UserController = require('../controllers/UserController');

route.get('/companyusers' , UserController.getCompanyUsers);
route.get('/changepassword', UserController.changePassword);
route.delete('/delete/:id' , UserController.deleteUser);
route.get('/user/:id' , UserController.getUserById);
route.put('/user/:id' , UserController.updateUser);

module.exports = router;

