const express = require('express')
const v1Controller = express.Router()
const users = require('./users/users.controller')
const moods = require('./moods/moods.controller')

v1Controller.get('/health-check', (req, res) => {
    return res.status(200).json({
        message: 'All OK!'
    })
})

v1Controller.use('/users', users)
v1Controller.use('/moods', moods)

module.exports = v1Controller
