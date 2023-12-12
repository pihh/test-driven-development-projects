var express = require('express');
const { transformResponse } = require('../utils/response');

var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json(transformResponse([]))
});

module.exports = router;
