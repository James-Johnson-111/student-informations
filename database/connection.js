const mysql = require('mysql');

const db = mysql.createPool( 
    {
        // host: 'localhost',
        // port : '3306',
        // user: 'root',
        // password: '',
        // database: 'student-info',
        // multipleStatements: true,
        // supportBigNumbers: true


        host: 'remotemysql.com',
        port : '3306',
        user: 'HVCcBMfMED',
        password: 'JgQVsIZ8mY',
        database: 'HVCcBMfMED',
        multipleStatements: true,
        supportBigNumbers: true,
    }
);

module.exports = db;