const { Firebase, ResponseMessage } = require('../../../utils')
const { db } = Firebase
const aggregateMoodCollection = 'aggregateMoods'
const createMood = async (req, res, next) => {
    try {
        let { mood } = req.body
        let moodDoc = {
            mood,
            addedBy: res.uid,
            editedBy: null,
            lastEdited: null
        }
        const moodsRef = await db.collection(aggregateMoodCollection)
        const find = await moodsRef.where('mood', '==', mood).get()
        if (!find.empty) {
            return res
                .status(403)
                .json(
                    ResponseMessage(true, 'This Aggregate mood already exists')
                )
        }
        const result = await db.collection(aggregateMoodCollection).add(moodDoc)
        moodDoc = {
            ...moodDoc,
            id: result.id
        }
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

async function editMood(req, res, next) {
    try {
        let { mood } = req.body

        let moodDoc = {
            mood,
            editedBy: res.uid,
            lastEdited: new Date()
        }
        const id = req.params.id
        const moodsRef = await db.collection(aggregateMoodCollection)
        const find = await moodsRef.where('mood', '==', mood).get()
        if (!find.empty) {
            return res
                .status(403)
                .json(
                    ResponseMessage(true, 'This Aggregate mood already exists')
                )
        }
        const check = await db.collection(aggregateMoodCollection).doc(id).get()
        if (!check.exists) {
            return res
                .status(404)
                .json(
                    ResponseMessage(true, 'This Aggregate mood does not exists')
                )
        }
        await db.collection(aggregateMoodCollection).doc(id).update(moodDoc)
        moodDoc = {
            ...moodDoc,
            id
        }
        return res.status(200).json(
            ResponseMessage(false, 'Successfully edited aggregate mood', {
                mood: moodDoc
            })
        )
    } catch (e) {
        e.status = 500
        return next(e)
    }
}

module.exports = {
    createMood,
    editMood
}
