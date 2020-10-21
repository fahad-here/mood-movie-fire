const express = require('express')
const { AuthMiddleware } = require('../../../middleware')
const genreController = express.Router()

genreController.post(
    '/',
    AuthMiddleware.requireAuth,
)

genreController.get(
    '/',
    AuthMiddleware.requireAuth,
)

genreController.put(
    '/:id',
    AuthMiddleware.requireAuth,
)

genreController.delete(
    '/:id',
    AuthMiddleware.requireAuth,
)

module.exports = genreController
