const functions = require('firebase-functions')
const admin = require('firebase-admin')
const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors({ origin: true }))

app.get('/hello-world', (req, res) => {
    return res.status(200).json({ message: 'Hello World!' })
})
module.exports = app
