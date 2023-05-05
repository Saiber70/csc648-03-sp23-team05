var express = require('express');
const router = express.Router();



/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/login', function(req, res, next) {
  res.render('login');
});





/* driver user registration */ 
router.post('/register_driver', (req, res, next) =>{
    let firstname = req.body.firstname; // username should be matched name attribute in the frontend
    let lastname = req.body.lastname;
    let username = req.body.username;
    let password = req.body.password; // password should be matched name attribute in the frontend
    let phone = req.body.phone;
    let email = req.body.email; // email
    let vehicle = req.body.vehicle; // password comfirmation 
    let licenseNumber = req.body.license_number;
    let availableTime = req.body.availableTime;
    
  
  // check if username already exists
  db.query("SELECT * FROM Driver_User WHERE user_name=?", [username]).then(([results, fields]) => {
    if(results && results.length == 0){
      return db.execute("SELECT * FROM Driver_User WHERE user_email=?", [email]);
    } else{
      throw new UserError(
        "Registration Failed: Username already exists",
        "/register_driver", // html needs to be changed to hb
        200
      );
    }
  })
  // check if email already exists
  .then(([results, fields]) => {
    if(results && results.length == 0){
      // instance statement 
      let baseSQL = "INSERT INTO Driver_User (user_name, user_first_name, user_last_name, user_password, user_email, user_phone, vehicle,license_number, available_time, created) VALUES (?,?,?,?,?,?,?,?,?,now());"
      return db.query(baseSQL, [username, firstname, lastname, password, email, phone, vehicle, licenseNumber, availableTime]);
    } else {
      throw new UserError(
        "Registration Failed: Email already exists",
        "/register_driver", // html needs to be changed to hb
        200
      );
    }
  })
  .then(([results, fields]) => {
    if(results && results.affectedRows){
      res.status(200).send("Registration Successful");
    } else{
      throw new UserError(
        "Registration Failed: Email already exists",
        "/register_driver", // html needs to be changed to hb
        500
      );
    }
  });
});


/**
 * SFSU user registration
 * first block of code handles situation if the username entered is already exist
 * second block of code handles situation if the email entered is already exist
 */
router.post('/register', (req, res, next) =>{
  let firstname = req.body.firstname; // username should be matched name attribute in the frontend
  let lastname = req.body.lastname;
  let username = req.body.username;
  let password = req.body.password; // password should be matched name attribute in the frontend
  let phone = req.body.phone;
  let email = req.body.email; // email
  

// check if username already exists
db.query("SELECT * FROM SFSU_User WHERE user_name=?", [username]).then(([results, fields]) => {
  if(results && results.length == 0){
    return db.execute("SELECT * FROM SFSU_User WHERE user_email=?", [email]);
  } else{
    throw new UserError(
      "Registration Failed: Username already exists",
      "/register", // html needs to be changed to hb
      200
    );
  }
})
// check if email already exists
.then(([results, fields]) => {
  if(results && results.length == 0){
    // instance statement 
    let baseSQL = "INSERT INTO SFSU_User (user_name, user_first_name, user_last_name, user_password, user_email, user_phone, created) VALUES (?,?,?,?,?,?,now());"
    return db.query(baseSQL, [username, firstname, lastname, password, email, phone, created]);
  } else {
    throw new UserError(
      "Registration Failed: Email already exists",
      "/register", // html needs to be changed to hb
      200
    );
  }
})
.then(([results, fields]) => {
  if(results && results.affectedRows){
    res.status(200).send("Registration Successful");
  } else{
    throw new UserError(
      "Registration Failed: Email already exists",
      "/register", // html needs to be changed to hb
      500
    );
  }
});
});


/***************************************************************************************
 * this block is to get the restaurant info as an user input for restaurant registration
 * and then convert address info into longitude and latitude through the google map api. 
 * Then, store it into the mysql database
 * **************************************************  *************************************/
const axios = require('axios');
const config = require('../config');
const mysql = require('mysql2/promise');

router.post('/register_restaurant', async (req, res, next) => {
  let restaurant_name = req.body.restaurant_name;
  let restaurant_address = req.body.restaurant_address;
  let city = req.body.city;
  let state = req.body.state;
  let country = req.body.country;
  let zipCode = req.body.zipCode;
  let weekly_discounts = req.body.weekly_discounts === 'on' ? 1 : 0; // check if the checkbox is checked
  let free_delivery = req.body.free_delivery === 'on' ? 1 : 0; // check if the checkbox is checked

  // Convert address to latitude and longitude using Google Maps Geocoding API
  const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${restaurant_address},+${city},+${state},+${zipCode}&key=${config.googleMapsApiKey}`);
  const location = response.data.results[0].geometry.location;
  const latitude = location.lat;
  const longitude = location.lng;

  // check if the restaurant name already exists
  const db = await mysql.createConnection(config.db);
  const [results, fields] = await db.execute("SELECT * FROM Restaurant WHERE restaurant_name=?", [restaurant_name]);
  if(results && results.length == 0){
    const [insertResults, insertFields] = await db.execute("INSERT INTO Restaurant (restaurant_name, restaurant_address, city, state, country, zip_code, weekly_discounts, free_delivery, latitude, longitude) VALUES (?,?,?,?,?,?,?,?,?,?);", [restaurant_name, restaurant_address, city, state, country, zipCode, weekly_discounts, free_delivery, latitude, longitude]);
    if(insertResults && insertResults.affectedRows){
      res.status(200).send("Registration Successful");
    } else{
      throw new UserError(
        "Registration Failed: Unable to register the restaurant",
        "/register", // html needs to be changed to hb
        500
      );
    }
  } else{
    throw new UserError(
      "Registration Failed: Restaurant Name already exists",
      "/register", // html needs to be changed to hb
      200
    );
  }
});
// still need to do the log in server side
// you should never expose certain types of error in the front end


router.post('/register', (req, res, next) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  // Check if user already exists
  db.execute('SELECT * FROM SFSU_User WHERE username = ?', [username])
    .then(([results, fields]) => {
      if (results && results.length > 0) {
        throw new UserError(
          'Registration Failed: Username already exists',
          '/register', // html needs to be changed to hb
          200
        );
      } else {
        // User does not exist, create new user
        return bcrypt.hash(password, saltRounds);
      }
    })
    .then((hashedPassword) => {
      // Insert new user into the database
      return db.execute(
        'INSERT INTO User (username, email, password) VALUES (?,?,?);',
        [username, email, hashedPassword]
      );
    })
    .then(([results, fields]) => {
      if (results && results.affectedRows) {
        res.render('login', {
          successMessage: 'Registration Successful! Please log in to continue.',
        });
      } else {
        throw new UserError(
          'Registration Failed: Unable to register the user',
          '/register', // html needs to be changed to hb
          500
        );
      }
    })
    .catch((error) => {
      next(error);
    });
});



module.exports = router;