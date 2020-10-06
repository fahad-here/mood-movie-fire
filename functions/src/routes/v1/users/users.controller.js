const express = require('express')
const { AuthMiddleware, UserMiddleware } = require('../../../middleware')
const usersController = express.Router()

usersController.post('/auth/signup', AuthMiddleware.signup)

usersController.get(
    '/',
    AuthMiddleware.requireAuth,
    UserMiddleware.getLoggedInUser
)

module.exports = usersController
