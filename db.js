const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    passward: '',
    database: 'todolist'
});

connection.connect();

module.exports = connection;