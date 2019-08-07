require('dotenv').config();
var mysql = require('mysql'),
    inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: 'localhost',
    user : 'user',
    port : '3306',
    password : process.env.MYSQL_USER_PASSWORD,
    database : 'top_songsDB'
});