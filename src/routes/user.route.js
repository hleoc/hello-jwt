const route = require('express').Router();
const { userController } = require('../controller');

route.post('/users', userController.createUsers);

module.exports = route;