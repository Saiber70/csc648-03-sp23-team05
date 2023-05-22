/**************************************************************
* Author: Hajime Miyazaki and Leyva Moreno
*
* File: database.js
*
* Description: The purpose of this file is to set up geocoding functions.
*
**************************************************************/
var express = require('express');
const router = express.Router();
var db = require('../conf/database');
const axios = require('axios');
var bcrypt = require('bcrypt');
const UserError = require('../helpers/error/UserError');
const { errorPrint, successPrint } = require("../helpers/debug/debugprinters");

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
            //{ field: 'email' }
          );
        }
      } else {
        throw new UserError(
          "Registration Failed: Username already exists",
          "/register",
          200
          //{ field: 'username' }
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
            //{ field: 'email' }
          );
        }
      } else {
        throw new UserError(
          "Registration Failed: Username already exists",
          "/register",
          200
          //{ field: 'username' }
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



/***************************************************************************************
 * this block is to get the restaurant info as an user input for restaurant registration
 * and then convert address info into longitude and latitude through the google map api. 
 * Then, store it into the mysql database
 * *************************************************************************************
 * */
// router.post('/register-restaurant', async (req, res, next) => {
//   let restaurant_name = req.body.restaurant_name;
//   let restaurant_address = req.body.restaurant_address;
//   let city = req.body.city;
//   let state = req.body.state;
//   let country = req.body.country;
//   let zipCode = req.body.zipCode;
//   let weekly_discounts = req.body.weekly_discounts === 'on' ? 1 : 0; // check if the checkbox is checked
//   let free_delivery = req.body.free_delivery === 'on' ? 1 : 0; // check if the checkbox is checked

//   db.query("SELECT * FROM Restaurant WHERE restaurant_name = ?", [restaurant_name])
//     .then(([results, fields]) => {
//       restaurant_id_Exists = results.length > 0;
//       restaurant_Exists = results.some(row => row.user_name === restaurant_name);


//       // user doesn't exist
//       if (!restaurant_id_Exists) {
//         // email doesn't exist
//         if (!restaurant_Exists) {
//           // columns that should be updated after the user submit the form
//           // default value in the db is 0 will be set to 1 after form submission
//           let baseSQL = 'INSERT INTO SFSU_User (user_name, user_first_name, user_last_name, user_password, user_email, user_phone, active, created) VALUES (?,?,?,?,?,?,1, NOW())'; 
//           // information values that we are getting from the user for registration
//           return db.query(baseSQL, [username, firstname, lastname, password, email, phone]);
//         } else {
//           throw new UserError(
//             "Registration Failed: Email already exists",
//             "/register",
//             200,
//             { field: 'email' } // Pass additional field information
//           );
//         }
//       } else {
//         throw new UserError(
// "Registration Failed: Username already exists",
//           "/register",
//           200,
//           { field: 'username' } // Pass additional field information
//         );
//       }
//     })
//     .then(([results, fields]) => {
//       if (results && results.affectedRows) {
//         console.log("Registration Successful");
//         res.redirect('/login');
//       } else {
//         throw new UserError(
//           "Registration Failed: Email already exists",
//           "/register",
//           500
//         );
//       }
//     })
//     .catch(error => {
//       console.error(error);
//       // Handle error response
//     });

//   // check if the restaurant name already exists
//   const db = await mysql.createConnection(db);
//   const [results, fields] = await db.execute("SELECT * FROM Restaurant WHERE restaurant_name=?", [restaurant_name]);
//   if(results && results.length == 0){
//     const [insertResults, insertFields] = await db.execute("INSERT INTO Restaurant (restaurant_name, restaurant_address, city, state, country, zip_code, weekly_discounts, free_delivery, latitude, longitude) VALUES (?,?,?,?,?,?,?,?,?,?);", [restaurant_name, restaurant_address, city, state, country, zipCode, weekly_discounts, free_delivery, latitude, longitude]);
//     if(insertResults && insertResults.affectedRows){
//       res.status(200).send("Registration Successful");
//     } else{
//       throw new UserError(
//         "Registration Failed: Unable to register the restaurant",
//         "/register", // html needs to be changed to hb
//         500
//       );
//     }
//   } else{
//     throw new UserError(
//       "Registration Failed: Restaurant Name already exists",
//       "/register", // html needs to be changed to hb
//       200
//     );
//   }

// //still need to do the log in server side
// //you should never expose certain types of error in the front end

// // Usage example
// const userAddress = '123 Main St, City, State'; // Replace with user input address
// storeAddressWithCoordinates(userAddress)
//   .catch(error => {
//     // Handle the error
//   });
// });

/**
 * this block is for User Login
 */

/*
router.post('/login', (req, res, next) => {
  //let username = req.body.username;
  let password = req.body.password;
  let email = req.body.email;

  // check if username already exists
  // check if username and email already exist
  //let userNotExists;
  //let emailNotExists;


  let baseSQL = 'INSERT INTO SFSU_User (user_name, user_first_name, user_last_name, user_password, user_email, user_phone, active, created) VALUES (?,?,?,?,?,?,1, NOW())';
      return db.execute(baseSQL, [username, firstname, lastname, hashedPassword, email, phone]);

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
            200,
            { field: 'email' }
          );
        }
      } else {
        throw new UserError(
          "Registration Failed: Username already exists",
          "/register",
          200,
          { field: 'username' }
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
          "Registration Failed: Email already exists",
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
*/

/*
router.post('/login', async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const role = req.body.role;

  // Using async/await to handle promises and errors using try/catch blocks
  try {
    if (role === "SFSU user") {
      // Check the first user table (e.g., SFSU_User)
      const sfsu_user_baseSQL = "SELECT user_email, user_password FROM SFSU_User WHERE user_email=? AND user_password=?;";
      const [sfsuResults] = await db.execute(sfsu_user_baseSQL, [email, password]);

      if (sfsuResults.length === 1) {
        successPrint(`SFSU User is logged in!`);
        return res.redirect('/');
      }

    } else if (role === "Delivery driver") {
      // Check the second user table (e.g., Driver_User)
      const driver_user_baseSQL = "SELECT user_email, user_password FROM Driver_User WHERE user_email=? AND user_password=?;";
      const [driverResults] = await db.execute(driver_user_baseSQL, [email, password]);

      if (driverResults.length === 1) {
        successPrint(`Driver is logged in!`);
        return res.redirect('/orders');
      }
    }
    throw new UserError("Invalid email and/or password!", "/login", 200);
  } catch (err) {
    errorPrint("User login failed");

    if (err instanceof UserError) {
      errorPrint(err.getMessage());
      res.status(err.getStatus());
      return res.redirect('/login');
    }
    next(err);
  }
});
*/

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
        throw new UserError("Invalid email and/or password!", "/login", 200);
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
/*
  try {
    let userTable = ""; // Variable to store the selected user table
 
    // Determine the user table based on the selected role
    if (role === "SFSU user") {
      userTable = "SFSU_User";
    } else if (role === "Delivery driver") {
      userTable = "Driver_User";
    }
 
    // Construct the SQL query using the selected user table
    const baseSQL = `SELECT user_email, user_password FROM ${userTable} WHERE user_email=?;`;
 
    // Execute the SQL query
    // Array of userResults represent the results obtained from the sql query
    const [userResults] = await db.execute(baseSQL, [email]);
 
    if (userResults.length === 1) {
      let hashedPassword = userResults[0].user_password;
      let passwordsMatched = await bcrypt.compare(password, hashedPassword);
      if (passwordsMatched) {
        if (role === "SFSU user") {
          successPrint("SFSU User is logged in!");
          return res.render('home');
        } else if (role === "Delivery driver") {
          successPrint("Driver is logged in!");
          return res.render('orders');
        }
      }
    }
 
    throw new UserError("Invalid email and/or password!", "/login", 200);
  } catch (err) {
    errorPrint("User login failed");
    if (err instanceof UserError) {
      errorPrint(err.getMessage());
      res.status(err.getStatus());
      return res.redirect('/login');
    }
    next(err);
  }
});
*/