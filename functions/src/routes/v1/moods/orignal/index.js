const express = require('express')
const { AuthMiddleware, MoodsMiddleware } = require('../../../../middleware')
const originalController = express.Router()

originalController.post('/')

originalController.get('/')

originalController.put('/:id')

originalController.delete('/:id')

module.exports = originalController
