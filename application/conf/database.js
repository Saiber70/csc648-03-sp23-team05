const mysql = require('mysql2');

const db = mysql.createPool({
    host: '127.0.0.1',
    user: 'team05',
    database: 'team05db',
    password: 'team05-csc648',
    port: '3306'
});

module.exports = db;
