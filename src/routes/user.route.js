const route = require('express').Router();
const { userController } = require('../controller');

route.post('/users', userController.createUsers);
route.post('/login', userController.userLogin);

module.exports = route;