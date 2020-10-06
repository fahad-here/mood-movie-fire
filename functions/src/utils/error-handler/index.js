const env = process.env
const ResponseMessage = require('../response-message')
const RouteErrorHandler = (err, req, res, next) => {
    // set locals, only providing error in development
    if (env.NODE_ENV === 'production') {
        console.log('production')
    } else {
        console.info('Error')
        console.info(err)
        res.status(err.status || 500)
        console.info(res.statusCode)
    }
    if (res.statusCode === 500)
        res.status(500).json(
            ResponseMessage(true, err.message || err.error_description)
        )
    else if (res.statusCode === 404)
        res.status(404).json(ResponseMessage(true, 'Page does not exist'))
    else res.json(ResponseMessage(true, err.message || err.error_description))
}

module.exports = RouteErrorHandler
