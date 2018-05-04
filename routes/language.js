var express = require('express');
var router = express.Router();
var {getFullLanguage}=require('../controllers/language-controller')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/get/:words',getFullLanguage)

module.exports = router;
