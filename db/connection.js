const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Letsdoit!',
    database: 'School_Management'
});

module.exports = pool;





