require('dotenv').config()
const cors = require('cors')
const express = require('express')
const app = express()
app.use(cors())
app.use(express.json())

// ROUTES
app.use('/api', require('./routes/service.route'))
module.exports = app