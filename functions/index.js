const functions = require('firebase-functions')
const app = require('./app')
const { AuthMiddleware } = require('./src/middleware')
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.processSignUp = functions.auth
    .user()
    .onCreate(AuthMiddleware.provideAdminAccessOnCreate)
exports.app = functions.https.onRequest(app)
