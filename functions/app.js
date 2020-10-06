const express = require('express')
const cors = require('cors')
const createError = require('http-errors')

const indexRouter = require('./src/routes')
const { RouteErrorHandler } = require('./src/utils')

const app = express()
app.use((req, res, next) => {
    next(createError(404))
})
app.use(cors({ origin: true }))
app.use('/api', indexRouter)
// error handler
app.use(RouteErrorHandler)

module.exports = app
