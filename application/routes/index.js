/**************************************************************
* Author: Mario Leyva Moreno and Hajime Miyazaki
*
* File: database.js
*
* Description: The purpose of this file is to set up a connection to our mysql database.
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

// function to search the back-end
// function search(req, res, next) {
//     // user's search term
//     let searchTerm = req.query.search;
//     // user's selected category
//     let category = req.query.category;
//     let filter = req.query.filter;
//     let query = 'SELECT * FROM Restaurant';

//     if (searchTerm != '' && category != '') {
//         query = `SELECT * FROM Restaurant WHERE restaurant_category = '` + category + `' AND restaurant_name LIKE '%` + searchTerm + `%'`;
//     } else if (searchTerm != '' && category == '') {
//         query = `SELECT * FROM Restaurant WHERE restaurant_name LIKE '%` + searchTerm + `%'`;
//     } else if (searchTerm == '' && category != '') {
//         query = `SELECT * FROM Restaurant WHERE restaurant_category = '` + category + `'`;
//     }

//     if (filter == 'Low to High') {
//         query = `SELECT * FROM Restaurant ORDER BY price_range`;
//     } else if (filter == 'High to Low') {
//         query = `SELECT * FROM Restaurant ORDER BY price_range DESC`;
//     } else if (filter == 'Delivery Time') {
//         query = `SELECT * FROM Restaurant ORDER BY delivery_time`;
//     } else if (filter == 'Featured') {
//         query = `SELECT * FROM Restaurant ORDER BY restaurant_id`;
//     }

//     db.query(query, (err, result) => {
//         if (err) {
//             req.searchResult = [];
//             req.searchTerm = "";
//             req.category = "";
//             next();
//         }

//         req.searchResult = result;
//         req.searchTerm = searchTerm;
//         req.category = category;

//         next();
//     });
// }
function search(req, res, next) {
    let searchTerm = req.query.search;
    let category = req.query.category;
    let filter = req.query.filter;
    let query = 'SELECT * FROM Restaurant';

    if (searchTerm != '' && category != '') {
        query = `SELECT * FROM Restaurant WHERE restaurant_category = ? AND restaurant_name LIKE ?`;
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
    } else if (searchTerm == '' && category != '') {
        query = `SELECT * FROM Restaurant WHERE restaurant_category = ?`;
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

//http://localhost:3000/result?category=value&search=value
router.get('/result', search, function (req, res, next) {
    let searchResult = req.searchResult;
    res.render('result', {
        title: 'Search Results',
        results: searchResult,
        searchTerm: req.searchTerm,
        category: req.category
    });
});

// /** for the signup button */
// router.get('/dashboard', isLoggedIn, (req, res) => {
//     // render dashboard page
//   });
  
//   function isLoggedIn(req, res, next) {
//     if (req.isAuthenticated()) {
//       return next();
//     }
//     res.redirect('/register');
//   }

module.exports = router;
