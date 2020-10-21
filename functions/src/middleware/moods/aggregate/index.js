const { Firebase, ResponseMessage } = require('../../../utils')
const { db } = Firebase
const aggregateMoodCollection = 'aggregateMoods'
const createMood = async (req, res, next) => {
    try {
        let { mood } = req.body
        const moodDoc = {
            mood,
            addedBy: res.uid
        }
        const AggMoodsDB = await db
            .collection(aggregateMoodCollection)
            .doc(mood)
        const find = await AggMoodsDB.get()
        if (find.exists) {
            return res
                .status(403)
                .json(
                    ResponseMessage(true, 'This Aggregate mood already exists')
                )
        }
        await db.collection(aggregateMoodCollection).doc(mood).set(moodDoc)
        return res.status(200).json(
            ResponseMessage(false, 'Successfully added aggregate mood', {
                mood: moodDoc
            })
        )
    } catch (e) {
        e.status = 404
        return next(e)
    }
}

module.exports = {
    createMood
}
