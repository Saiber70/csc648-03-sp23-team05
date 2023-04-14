var express = require('express');
const router = express.Router();
const searchObj = require('./search'); // import search function from search.js
const search = searchObj.search;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home', {title:'Home Page'});
});

router.get('/index', (req, res, next) => {
  res.render('index');
});

router.get('/result', search, (req, res, next) => {
  //let searchResult = req.searchResult;
  let searchResult = req.searchResult;
    res.render('result', {
        title: 'Results Page',
        results: searchResult.length,
        searchTerm: req.searchTerm,
        searchResult: searchResult,
        category: req.category
    });
});

module.exports = router;
