const mysql = require('mysql2');

/*
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'teamdb',
    password: '08042001',
    port: '3306'
});
*/

const db = mysql.createPool({
    host: '127.0.0.1',
    user: 'team05',
    database: 'team05db',
    password: 'team05-csc648',
    port: '3306'
});

module.exports = db;