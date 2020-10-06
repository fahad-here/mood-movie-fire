const { Firebase, ResponseMessage } = require('../../utils')

const getLoggedInUser = async (req, res, next) => {
    try {
        const uid = res.uid
        const user = await Firebase.Admin.auth().getUser(uid)
        return res
            .status(200)
            .json(ResponseMessage(false, 'Successfully fetched user', { user }))
    } catch (e) {
        e.status = 404
        return next(e)
    }
}

module.exports = {
    getLoggedInUser
}
