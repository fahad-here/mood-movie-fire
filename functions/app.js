const express = require('express')
const cors = require('cors')

const indexRouter = require('./src/routes')
const { RouteErrorHandler } = require('./src/utils')

const app = express()

app.use(cors({ origin: true }))
app.use('/api', indexRouter)
// error handler
app.use(RouteErrorHandler)

module.exports = app
