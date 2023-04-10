
const express = require('express');
const app = express();
const router = express.Router();
const mysql = require('mysql');

// used to establish a connection between the front-end and team's database on the server
const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'team05',
  password: '12345678',
  database: 'team05db',
});

// used to test connection to MySQL database
db.connect((err) => {
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

    db.query("SELECT 1+1", function(err, results, fields) {
         if(err) {
             console.error(err);
         }else{
             console.log(results);
         }
    });

    db.query(query, (err, result) => {
        if (err) {
            req.searchResult = "";
            req.searchTerm = "";
            req.category = "";
            next();
        }

        req.searchResult = result;
        req.searchTerm = searchTerm;
        req.category = "";

        next();
    });
}

router.get('/result', search, (req, res) => {
    let searchResult = req.searchResult;
    // results renedered in the home  page
    res.render('home', {
        //represents the title of the page
        title: "Home Page",
        //represents the number of search results found
        results: searchResult.length,
        //represents the user's search term
        searchTerm: req.searchTerm,
        // An array of objects representing the search results
        searchResult: searchResult,
        // represents the user's selected category
        category: req.category
    });
});


app.listen("3000", () => {
    console.log("Server started on port 3000");
});

module.exports = db;
