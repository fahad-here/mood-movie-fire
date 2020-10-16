const express = require('express')
const { AuthMiddleware, UserMiddleware } = require('../../../middleware')
const aggregateController = express.Router()

aggregateController.post('/')

aggregateController.get(
    '/',
)

aggregateController.put('/:id')

aggregateController.delete('/:id')

module.exports = aggregateController
