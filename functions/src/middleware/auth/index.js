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
        const decodedToken = await Firebase.Admin.auth().verifyIdToken(
            authorization
        )
        res.uid = decodedToken.uid
        return next()
    } catch (e) {
        e.status = 401
        return next(e)
    }
}

const provideAdminAccessOnCreate = (user) => {
    if (user.email.endsWith('@fahadhere.com')) {
        const customClaims = {
            admin: true,
            accessLevel: 9
        }
        return Firebase.Admin.auth()
            .setCustomUserClaims(user.uid, customClaims)
            .catch((error) => {
                console.log(error)
            })
    } else {
        const customClaims = {
            user: true,
            accessLevel: 3
        }
        return Firebase.Admin.auth()
            .setCustomUserClaims(user.uid, customClaims)

            .catch((error) => {
                console.log(error)
            })
    }
}

module.exports = {
    signup,
    requireAuth,
    provideAdminAccessOnCreate
}
