var express = require('express');
const router = express.Router();
const db = require('../conf/database');

// used to test connection to MySQL database
db.getConnection((err) => {
    if (err) {
        throw err;
    }
    console.log('MySql Connected!');
    db.query('USE team05db');
});

// function to search the back-end
function search(req, res, next) {
    // user's search term
    let searchTerm = req.query.search;
    // user's selected category
    let category = req.query.category;

    let query = 'SELECT * FROM Restaurant';
    if (searchTerm != '' && category != '') {
        query = `SELECT * FROM Restaurant WHERE restaurant_category = '` + category + `' AND restaurant_name LIKE '%` + searchTerm + `%'`;
    } else if (searchTerm != '' && category == '') {
        query = `SELECT * FROM Restaurant WHERE restaurant_name LIKE '%` + searchTerm + `%'`;
    } else if (searchTerm == '' && category != '') {
        query = `SELECT * FROM Restaurant WHERE Category = '` + category + `'`;
    }

    db.query(query, (err, result) => {
        if (err) {
            req.searchResult = [];
            req.searchTerm = "";
            req.category = "";
            next();
        }

        req.searchResult = result;
        req.searchTerm = searchTerm;
        req.category = category;

        next();
    });
}

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('home', { title: 'Home Page' });
});

router.get('/index', (req, res, next) => {
    res.render('index', { title: 'Team Page' });
});

router.get('/result', (req, res, next) => {
    res.render('result', { title: 'Results Page' });
});

router.get('/result', search, (req, res, next) => {
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
