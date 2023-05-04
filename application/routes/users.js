var express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/login', function(req, res, next) {
  res.render('login');
});





/* SFSU user registration */


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

// still need to do the log in server side
// you should never expose certain types of error in the front end




module.exports = router;