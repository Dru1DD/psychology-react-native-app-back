const express = require('express');

const { check } = require('express-validator')

const controller = require('./authController')
const diagramsController = require('./diagramsController')

const router = express.Router();

router.get('/', function(req, res, next) {
  res.send("Welcome to backend")
});

router.post('/login', controller.login)

router.post('/registration', [
    check('username', "Имя пользователя не может быть пустым").notEmpty(),
    check('password', "Пароль должен быть не меньше 4 символов и меньше 16 символов").isLength({min: 4, max: 16})
], controller.registration)

router.post('/diagrams', diagramsController.saveDiagrams)

router.get('/diagrams', diagramsController.getDiagrams)

router.get('/users', controller.getUsers)

router.get('/user', controller.getUser)

module.exports = router;
