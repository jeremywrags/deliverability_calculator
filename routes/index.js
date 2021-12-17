var express = require('express');
var router = express.Router();

var jsforce = require('jsforce');
var conn = new jsforce.Connection();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
