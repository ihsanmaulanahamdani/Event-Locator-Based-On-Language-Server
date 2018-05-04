const express = require('express')
const router = express.Router()

const { searchEvent } = require('../controllers/search.controller')
const { getCoordinate } = require('../middlewares/coordinate.middleware')
const { getFullLanguage } = require('../middlewares/language-middleware')


router.get('/:words', getFullLanguage, getCoordinate, searchEvent)


module.exports = router