const express = require('express')
const { AuthMiddleware, MoodsMiddleware } = require('../../../../middleware')
const { OriginalMiddleware } = MoodsMiddleware
const originalController = express.Router()

originalController.post(
    '/',
    AuthMiddleware.requireAuth,
    OriginalMiddleware.createMood
)

originalController.get(
    '/',
    AuthMiddleware.requireAuth,
    OriginalMiddleware.getAllOriginalMoods
)

originalController.put(
    '/:id',
    AuthMiddleware.requireAuth,
    OriginalMiddleware.editMood
)

originalController.delete(
    '/:id',
    AuthMiddleware.requireAuth,
    OriginalMiddleware.deleteMood
)

module.exports = originalController
