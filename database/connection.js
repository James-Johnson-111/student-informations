const mysql = require('mysql');

const db = mysql.createPool( 
    {
        host: 'localhost',
        port : '3306',
        user: 'root',
        password: '',
        database: 'student-info',
        multipleStatements: true,
        supportBigNumbers: true
    }
);

module.exports = db;