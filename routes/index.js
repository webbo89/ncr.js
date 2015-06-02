var express = require('express');
var router = express.Router();
var printer = require('../printer.js');


/* GET home page. */
router.get('/', function(req, res, next) {
  printer.write();
  res.render('index', { title: 'Express' });
});

/* GET home page. */
router.post('/print/message', function(req, res, next) {
  printer.addMessage(req.body.message);
  //console.log(req.body)
  res.json({ title: 'Express' });
});

module.exports = router;
