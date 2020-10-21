const { Firebase, ResponseMessage } = require('../../../utils')
const { db } = Firebase
const originalMoodCollectionName = 'originalMoods'
const aggregateMoodCollectionName = 'aggregateMoods'
const genreCollectionName = 'genre'
const createGenre = async (req, res, next) => {
    try {
        let { genre, originalMoodId, originalMoodName, aggregateMoodId, aggregateMoodName } = req.body
        if (!originalMoodId || !originalMoodName|| !aggregateMoodId || ! aggregateMoodName )
            return res
                .status(400)
                .json(
                    ResponseMessage(
                        true,
                        'Original and aggregate mood ids and names are required'
                    )
                )
        let genreDoc = {
            originalMoodId,
            originalMoodName,
            aggregateMoodId,
            aggregateMoodName,
            genre,
            addedBy: res.uid,
            editedBy: null,
            lastEdited: null
        }
        const genreRef = await db.collection(genreCollectionName)
        const find = await genreRef.where('genre', '==', genre).get()
        if (!find.empty)
            return res
                .status(403)
                .json(
                    ResponseMessage(true, 'This genre already exists')
                )
        const findOriginalMood = await db
            .collection(originalMoodCollectionName)
            .doc(originalMoodId)
            .get()
        if (!findOriginalMood.exists)
            return res
                .status(403)
                .json(ResponseMessage(true, 'No such original mood exists'))
        const findAggregateMood = await db
            .collection(aggregateMoodCollectionName)
            .doc(aggregateMoodId)
            .get()
        if (!findAggregateMood.exists)
            return res
                .status(403)
                .json(ResponseMessage(true, 'No such aggregate mood exists'))
        const result = await genreRef.add(genreDoc)
        genreDoc = {
            ...genreDoc,
            id: result.id
        }
        return res.status(200).json(
            ResponseMessage(false, 'Successfully added genre', {
                genre: genreDoc
            })
        )
    } catch (e) {
        e.status = 404
        return next(e)
    }
}

async function editMood(req, res, next) {
    try {
        let { mood, parentMoodId, parentMoodName } = req.body
        if (!parentMoodId || !parentMoodName)
            return res
                .status(400)
                .json(
                    ResponseMessage(
                        true,
                        'Parent mood id and name are required'
                    )
                )
        let moodDoc = {
            mood,
            parentMoodId,
            parentMoodName,
            editedBy: res.uid,
            lastEdited: new Date()
        }
        const id = req.params.id

        const originalMoodsRef = await db.collection(originalMoodCollectionName)
        const check = await originalMoodsRef.doc(id).get()
        if (!check.exists) {
            return res
                .status(404)
                .json(
                    ResponseMessage(
                        true,
                        'The mood you are trying to edit does not exists'
                    )
                )
        }
        const find = await originalMoodsRef.where('mood', '==', mood).get()
        if (!find.empty)
            return res
                .status(403)
                .json(
                    ResponseMessage(true, 'This original mood already exists')
                )
        const findParent = await db
            .collection(aggregateMoodCollectionName)
            .doc(parentMoodId)
            .get()
        if (!findParent.exists)
            return res
                .status(403)
                .json(ResponseMessage(true, 'No such parent mood exists'))
        await db.collection(originalMoodCollectionName).doc(id).update(moodDoc)
        moodDoc = {
            ...moodDoc,
            id
        }
        return res.status(200).json(
            ResponseMessage(false, 'Successfully edited original mood', {
                mood: moodDoc
            })
        )
    } catch (e) {
        e.status = 500
        return next(e)
    }
}

async function deleteMood(req, res, next) {
    try {
        const id = req.params.id
        const check = await db
            .collection(originalMoodCollectionName)
            .doc(id)
            .get()
        if (!check.exists)
            return res
                .status(404)
                .json(
                    ResponseMessage(true, 'This original mood does not exists')
                )
        await db.collection(originalMoodCollectionName).doc(id).delete()
        return res.status(200).json(
            ResponseMessage(false, 'Successfully deleted original mood', {
                id
            })
        )
    } catch (e) {
        e.status = 500
        return next(e)
    }
}

async function getOriginalMood(req, res, next) {
    try {
        const id = req.params.id
        let check = await db
            .collection(originalMoodCollectionName)
            .doc(id)
            .get()
        if (!check.exists) {
            return res
                .status(404)
                .json(
                    ResponseMessage(true, 'This original mood does not exists')
                )
        }
        let mood = {
            ...check.data(),
            id
        }
        await db.collection(originalMoodCollectionName).doc(id).delete()
        return res.status(200).json(
            ResponseMessage(false, 'Successfully fetched original mood', {
                mood
            })
        )
    } catch (e) {
        e.status = 500
        return next(e)
    }
}

async function getAllOriginalMoods(req, res, next) {
    try {
        let snapshot = await db.collection(originalMoodCollectionName).get()
        let moods = []
        snapshot.forEach((doc) => {
            let mood = {
                ...doc.data(),
                id: doc.id
            }
            moods.push(mood)
        })
        return res.status(200).json(
            ResponseMessage(false, 'Successfully fetched all original moods', {
                moods
            })
        )
    } catch (e) {
        e.status = 500
        return next(e)
    }
}

module.exports = {
    createMood: createGenre,
    editMood,
    deleteMood,
    getOriginalMood,
    getAllOriginalMoods
}
