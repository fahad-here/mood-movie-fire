const Admin = require('firebase-admin')

const serviceAccount = require('../../../.permission.json')

Admin.initializeApp({
    credential: Admin.credential.cert(serviceAccount),
    databaseURL: 'https://mood-movie-fire.firebaseio.com'
})

module.exports = {
    Admin,
    db: Admin.firestore()
}
