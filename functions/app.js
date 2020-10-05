const functions = require('firebase-functions')
const admin = require('firebase-admin')
const express = require('express')
const cors = require('cors')

const indexRouter = require('./src/routes')

const app = express()

app.use(cors({ origin: true }))
app.use('/api', indexRouter)

module.exports = app
