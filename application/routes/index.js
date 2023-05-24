/**************************************************************
* Author: Mario Leyva Moreno and Hajime Miyazaki
*
* File: index.js
*
* Description: The purpose of this file is to set up the routes from our home page to the rest
* of our pages in the application. We have also implemented the search functionality for users to be able
* to perform basic search queries using a fuzzy search implementation.
*
**************************************************************/
var express = require('express');
const router = express.Router();
var db = require('../conf/database');

// used to test connection to MYSQL database
db.getConnection((err) => {
    if (err) {
        throw err;
    }
    console.log('MySql Connected!');
    db.query('USE team05db');
});

// search function to search for restaurants on the site by category and/or search text field
function search(req, res, next) {


    let searchTerm = req.query.search;
    let category = req.query.category;
    let filter = req.query.filter;
    let query = 'SELECT * FROM Restaurant';

    // search for nonempty search term and category and then querying the results
    if (searchTerm != '' && category != '') {
        query = `SELECT * FROM Restaurant WHERE category_name = ? AND restaurant_name LIKE ?`;
        db.execute(query, [category, `%${searchTerm}%`])
            .then(([result, fields]) => {
                req.searchResult = result;
                req.searchTerm = searchTerm;
                req.category = category;
                next();
            })
            .catch(err => {
                req.searchResult = [];
                req.searchTerm = '';
                req.category = '';
                console.error(err);
                next();
            });
    // search for nonempty search term and non-selected category
    } else if (searchTerm != '' && category == '') {
        query = `SELECT * FROM Restaurant WHERE restaurant_name LIKE ?`;
        db.execute(query, [`%${searchTerm}%`])
            .then(([result, fields]) => {
                req.searchResult = result;
                req.searchTerm = searchTerm;
                req.category = category;
                next();
            })
            .catch(err => {
                req.searchResult = [];
                req.searchTerm = '';
                req.category = '';
                console.error(err);
                next();
            });

    // search for empty search term and selected category
    } else if (searchTerm == '' && category != '') {
        query = `SELECT * FROM Restaurant WHERE category_name = ?`;
        db.execute(query, [category])
            .then(([result, fields]) => {
                req.searchResult = result;
                req.searchTerm = searchTerm;
                req.category = category;
                next();
            })
            .catch(err => {
                req.searchResult = [];
                req.searchTerm = '';
                req.category = '';
                console.error(err);
                next();
            });

    // if both fields empty, just return all of the results and display to the user
    } else {
        db.execute(query)
            .then(([result, fields]) => {
                req.searchResult = result;
                req.searchTerm = searchTerm;
                req.category = category;
                next();
            })
            .catch(err => {
                req.searchResult = [];
                req.searchTerm = '';
                req.category = '';
                console.error(err);
                next();
            });
    }
}
/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('home', { title: 'Home Page' });
});

router.get('/index', (req, res, next) => {
    res.render('index', { title: 'Team Page' });
});

router.get('/login', (req, res, next) => {
    res.render('login');
});

// deleting this because the route for the register is
// handled in the users.js file
router.get('/register', (req, res, next) => {
    res.render('register');
});

router.get('/checkout', (req, res, next) => {
    res.render('checkout');
});

router.get('/register_driver', (req, res, next) => {
    res.render('register_driver');
});

router.get('/register_restaurant', (req, res, next) => {
    res.render('register_restaurant');
});

router.get('/register_restaurant2', (req, res, next) => {
    res.render('register_restaurant2');
});

router.get('/upload', (req, res, next) => {
    res.render('menu_upload');
});

router.get('/selected', (req, res, next) => {
    res.render('selected_restaurant');
});

router.get('/orders', (req, res, next) => {
    res.render('orders');
});

router.get('/about', (req, res, next) => {
    res.render('about');
});

router.get('/reset_password', (req, res, next) => {
    res.render('reset_password');
});

// route to results page where user's search results are displayed

router.get('/result', search, function (req, res, next) {
    let searchResult = req.searchResult;
    res.render('result', {
        title: 'Search Results',
        results: searchResult,
        searchTerm: req.searchTerm,
        category: req.category
    });
});

module.exports = router;
