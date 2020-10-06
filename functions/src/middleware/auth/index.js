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
            .then(() => {
                // Update real-time database to notify client to force refresh.
                const metadataRef = Firebase.Admin.database().ref(
                    'genre/' + user.uid
                )
                // Set the refresh time to the current UTC timestamp.
                // This will be captured on the client to force a token refresh.
                return metadataRef.set({ refreshTime: new Date().getTime() })
            })
            .catch((error) => {
                console.log(error)
            })
    } else {
        console.log('user not ending with fahadhere')
    }
}

module.exports = {
    signup,
    requireAuth,
    provideAdminAccessOnCreate
}
