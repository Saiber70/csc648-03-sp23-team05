/**************************************************************
* Author: Hajime Miyazaki and Mario Leyva Moreno
*
* File: users.js
*
* Description: The purpose of this file is to set up geocoding functions.
*
**************************************************************/
var express = require('express');
const router = express.Router();
var db = require('../conf/database');
var bcrypt = require('bcrypt');
const UserError = require('../helpers/error/UserError');
const { errorPrint, successPrint } = require("../helpers/debug/debugprinters");
const flash = require('connect-flash');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.get('/login', function (req, res, next) {
  res.render('login');
});





/* driver user registration */
router.post('/register_driver', (req, res, next) => {
  let firstname = req.body.firstname;
  let lastname = req.body.lastname;
  let username = req.body.username;
  let email = req.body.email;
  let phone = req.body.phone;
  let vehicle = req.body.vehicle;
  let license_number = req.body.license_number;
  let password = req.body.password;
  let availableTime = req.body.availableTime;

  let userExists, emailExists;
  db.query("SELECT * FROM Driver_User WHERE user_name = ? OR user_email = ?", [username, email])
    .then(([results, fields]) => {
      userExists = results.length > 0;
      usernameExists = results.some(row => row.user_name === username);
      emailExists = results.some(row => row.user_email === email);

      if (!userExists) {
        if (!emailExists) {
          return bcrypt.hash(password, 10); // Hash the password
        } else {
          throw new UserError(
            "Registration Failed: Email already exists",
            "/register",
            200
          );
        }
      } else {
        throw new UserError(
          "Registration Failed: Username already exists",
          "/register",
          200
        );
      }
    })
    .then((hashedPassword) => {
      let baseSQL = 'INSERT INTO Driver_User (user_name, user_first_name, user_last_name, user_email, user_phone, vehicle, license_number, user_password, available_time, active, created) VALUES (?,?,?,?,?,?,?,?,?,1, NOW())';
      return db.query(baseSQL, [username, firstname, lastname, email, phone, vehicle, license_number, hashedPassword, availableTime]);
    })
    .then(([results, fields]) => {
      if (results && results.affectedRows) {
        console.log("Registration Successful");
        res.redirect('/login');
      } else {
        throw new UserError(
          "Server Error, user could not be created",
          "/register",
          500
        );
      }
    })
    .catch(error => {
      console.error(error);
      // Handle error response
    });
});


/**
* SFSU user registration
* first block of code handles situation if the username entered is already exist
* second block of code handles situation if the email entered is already exist
* encrypt password
* insert userinfo with hashed password
*/

router.post('/register', (req, res, next) => {
  let username = req.body.username;
  let firstname = req.body.firstname;
  let lastname = req.body.lastname;
  let password = req.body.password;
  let re_password = req.body.re_password;
  let phone = req.body.phone;
  let email = req.body.email;

  // check if username already exists
  // check if username and email already exist
  let userExists, emailExists;

  db.query("SELECT * FROM SFSU_User WHERE user_name = ? OR user_email = ?", [username, email])
    .then(([results, fields]) => {
      userExists = results.length > 0;
      usernameExists = results.some(row => row.user_name === username);
      emailExists = results.some(row => row.user_email === email);

      if (!userExists) {
        if (!emailExists) {
          // Hash the password
          return bcrypt.hash(password, 10);
        } else {
          throw new UserError(
            "Registration Failed: Email already exists",
            "/register",
            200
          );
        }
      } else {
        throw new UserError(
          "Registration Failed: Username already exists",
          "/register",
          200
        );
      }
    })
    .then((hashedPassword) => {
      let baseSQL = 'INSERT INTO SFSU_User (user_name, user_first_name, user_last_name, user_password, user_email, user_phone, active, created) VALUES (?,?,?,?,?,?,1, NOW())';
      return db.execute(baseSQL, [username, firstname, lastname, hashedPassword, email, phone]);
    })
    .then(([results, fields]) => {
      if (results && results.affectedRows) {
        console.log("Registration Successful");
        res.redirect('/login');
      } else {
        throw new UserError(
          "Server Error, user could not be created",
          "/register",
          500
        );
      }
    })
    .catch(error => {
      console.error(error);
      // Handle error response
    });
});

router.post('/login', (req, res, next) => {
  let username = req.body.username;
  let password = req.body.password;
  let role = req.body.role;

  // Variable to store the selected user table
  let userTable = "";
  // Determine the user table based on the selected role
  if (role === "SFSU user") {
    userTable = "SFSU_User";
  } else if (role === "Delivery driver") {
    userTable = "Driver_User";
  }

  let baseSQL = `SELECT user_name, user_password FROM ${userTable} WHERE user_name=?;`;
  db.execute(baseSQL, [username])
    .then(([results, fields]) => {
      if (results && results.length == 1) {
        let hashedPassword = results[0].user_password;
        return bcrypt.compare(password, hashedPassword);
      } else {
        throw new UserError("Invalid username and/or password!", "/login", 200);
      }
    })
    .then((passwordsMatched) => {
      if (passwordsMatched) {
        if (role === "SFSU user") {
          successPrint(`SFSU user ${username} is logged in!`);
          res.locals.logged = true;
          req.session.username = username;
          return res.redirect('/');
        } else if (role === "Delivery driver") {
          successPrint(`Driver user ${username} is logged in!`);
          res.locals.logged = true;
          req.session.username = username;
          return res.redirect('/orders');
        }
      } else {
        req.flash('error', 'Invalid username and/or password!');
        return res.redirect('/login');
        //throw new UserError("Invalid email and/or password!", "/login", 200);
      }
    })
    .catch((err) => {
      errorPrint("user login failed");
      if (err instanceof UserError) {
        errorPrint(err.getMessage());
        res.status(err.getStatus());
        res.redirect('/login');
      } else {
        next(err);
      }
    });
});

router.post('/logout', (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      errorPrint('session could not be destroyed.');
      next(err);
    } else {
      successPrint('Session was successfully destroyed');
      res.clearCookie('csid');
      res.json({ status: 'OK', mesage: 'user is logged out' });
    }
  })
});


module.exports = router;