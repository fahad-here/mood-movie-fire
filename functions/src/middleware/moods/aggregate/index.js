const {Firebase, ResponseMessage} = require('../../utils')

const createMood = async (req, res, next) => {
    try {
        const {mood} = req.body
        const AggMoodsDB = await Firebase.Admin.database().ref.child('aggregateMoods')
        const snapshot = await AggMoodsDB.orderByChild('mood').equalTo(mood).once("value")
        if (snapshot.exists()) {
            return res
                .status(403)
                .json(ResponseMessage(false, 'This Aggregate mood already exists'))
        }
        return res
            .status(200)
            .json(ResponseMessage(false, 'Successfully added aggregate moood', {user}))
    } catch (e) {
        e.status = 404
        return next(e)
    }
}

module.exports = {
    createMood
}