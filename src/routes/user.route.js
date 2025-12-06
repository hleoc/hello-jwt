const route = require('express').Router();
const { userController } = require('../controller');
const validateJWT = require('../auth/validateJWT');

route.post('/users', userController.createUsers);
route.post('/login', userController.userLogin);
route.get('/users/me', validateJWT, userController.findByMe);

module.exports = route;