const express = require('express')
const { AuthMiddleware, MoodsMiddleware } = require('../../../../middleware')
const { AggregateMiddleware } = MoodsMiddleware
const aggregateController = express.Router()

aggregateController.post(
    '/',
    AuthMiddleware.requireAuth,
    AggregateMiddleware.createMood
)

aggregateController.get('/')

aggregateController.put('/:id')

aggregateController.delete('/:id')

module.exports = aggregateController
