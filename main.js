const express = require('express');
const mysql = require('mysql2/promise');
const app = express();
app.use(express.json());

const { createPool } = require('mysql2');
const pool = createPool({
        host: 'localhost',
        user: 'root',
        password: 'Letsdoit!',
        database: 'School_Magement'
    });
    module.exports = pool;









app.listen(3000, () => {
    console.log('Server running on port 3000');
});