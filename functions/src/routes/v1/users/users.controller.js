const express = require('express')
const { AuthMiddleware } = require('../../../middleware')
const usersController = express.Router()

usersController.post('/auth/signup', AuthMiddleware.signup)

module.exports = usersController
