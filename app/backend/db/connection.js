


const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Letsdoit!',
    database: 'School_Management'
});

module.exports = pool;


db.connect((err) => {
    if (err) {
      console.error('Could not connect to the database:', err);
      return;
    }
    console.log('Connected to the database');
  });
  



  app.get('/api/teachers', (req, res) => {
    db.query('SELECT * FROM TEACHERS', (err, results) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json(results);
    });
  });
  
  // Add a new teacher
  app.post('/api/teachers', (req, res) => {
    const teacher = req.body;
    const { persal, title, initial, surname, department, email } = teacher;
    
    const query = 'INSERT INTO TEACHERS (PERSAL, TITLE, INITIAL, SURNAME, DEPARTMENT, EMAIL) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(query, [persal, title, initial, surname, department, email], (err, result) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.status(201).json({ message: 'Teacher added successfully' });
    });
  });
  
  // Get all learners
  app.get('/api/learners', (req, res) => {
    db.query('SELECT * FROM LEARNERS', (err, results) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json(results);
    });
  });
  
  // Add a new learner
  app.post('/api/learners', (req, res) => {
    const learner = req.body;
    const { id, name, surname, grade, class: className } = learner;
    
    const query = 'INSERT INTO LEARNERS (ID, NAME, SURNAME, GRADE, CLASS) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [id, name, surname, grade, className], (err, result) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.status(201).json({ message: 'Learner added successfully' });
    });
  });
  
  // Start the server
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });





