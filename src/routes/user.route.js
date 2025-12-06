const route = require('express').Router();
const { userController } = require('../controller');
const validateJWT = require('../auth/validateJWT');
const validateAdmin = require('../middlewares/admin');

route.post('/users', userController.createUsers);
route.post('/login', userController.userLogin);
route.get('/users/me', validateJWT, userController.findByMe);
route.get('/top-secret', validateJWT, validateAdmin, userController.findSecret);

module.exports = route;