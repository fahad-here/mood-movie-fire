const express = require('express')
const moodsController = express.Router()
const aggregateController = require('./aggregate')
const originalController = require('./orignal')

moodsController.use('/aggregate', aggregateController)
moodsController.use('/original', originalController)

module.exports = moodsController
