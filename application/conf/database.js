const mysql = require('mysql2');

const db = mysql.createPool({
    host: '127.0.0.1',
    user: 'team05',
    database: 'team05db',
    password: 'team05-csc648'
});

// used to test connection to MySQL database
db.getConnection((err) => {
    if (err) {
      throw err;
    }
    console.log('MySql Connected!');
    db.query('USE team05db');
  });

module.exports = db;