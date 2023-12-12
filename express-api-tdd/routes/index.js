var express = require('express');
const { transformResponse } = require('../utils/response');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/api', function(req, res, next) {
  res.json(transformResponse({message:"Application running"}))
});

module.exports = router;
