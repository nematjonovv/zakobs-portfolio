const express = require('express')
const servicesController = require('../controllers/services.controller')
const router = express.Router()

router.post('/services', servicesController.createService)

module.exports = router