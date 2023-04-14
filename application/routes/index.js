var express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home', {title:'Home Page'});
});

router.get('/index', (req, res, next) => {
  res.render('index');
});

router.get('/result', (req, res, next) => {
  res.render('result', {title:'Results Page'});
});

module.exports = router;
