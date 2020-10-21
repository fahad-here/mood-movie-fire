const express = require('express')
const { AuthMiddleware, MoodsMiddleware } = require('../../../../middleware')
const { AggregateMiddleware } = MoodsMiddleware
const aggregateController = express.Router()

aggregateController.post(
    '/',
    AuthMiddleware.requireAuth,
    AggregateMiddleware.createMood
)

aggregateController.get(
    '/',
    AuthMiddleware.requireAuth,
    AggregateMiddleware.getAllAggregateMoods
)

aggregateController.put(
    '/:id',
    AuthMiddleware.requireAuth,
    AggregateMiddleware.editMood
)

aggregateController.delete(
    '/:id',
    AuthMiddleware.requireAuth,
    AggregateMiddleware.deleteMood
)

module.exports = aggregateController
