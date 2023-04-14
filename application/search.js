const db = require('./conf/database');
// used to test connection to MySQL database
db.getConnection((err) => {
    if (err) {
      throw err;
    }
    console.log('MySql Connected!');
    db.query('USE team05db');
  });
