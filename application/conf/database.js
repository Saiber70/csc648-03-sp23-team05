/**************************************************************
* Author: Mario Leyva Moreno
*
* File: database.js
*
* Description: The purpose of this file is to set up a connection to our mysql database
* using the mysql2-promise module.
*
**************************************************************/

const mysql = require('mysql2/promise');

const db = mysql.createPool({
    host: '127.0.0.1',
    user: 'team05',
    database: 'team05db',
    password: 'team05-csc648',
    port: '3306'
});


module.exports = db;

