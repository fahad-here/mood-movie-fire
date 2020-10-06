const { Firebase, ResponseMessage } = require('../../utils')
const signup = async (req, res, next) => {
    try {
        const { email, phoneNumber, password, firstName, lastName } = req.body
        const user = await Firebase.Admin.auth().createUser({
            email,
            phoneNumber,
            password,
            displayName: `${firstName} ${lastName}`
        })
        return res
            .status(200)
            .json(ResponseMessage(false, 'Successfully signed up', { user }))
    } catch (e) {
        e.status = 400
        return next(e)
    }
}

const requireAuth = async (req, res, next) => {
    try {
        const { authorization } = req.headers
        await Firebase.Admin.auth().verifyIdToken(authorization)
        return next()
    } catch (e) {
        e.status = 401
        return next(e)
    }
}

module.exports = {
    signup,
    requireAuth
}
