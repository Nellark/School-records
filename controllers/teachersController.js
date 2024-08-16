const pool = require('../db/connection');

// GET all teachers
const getAllTeachers = async (req, res) => {
    try {
        const [results] = await pool.query('SELECT * FROM TEACHERS');
        res.json(results);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
};

// GET teacher by Persal
const getTeacherByPersal = async (req, res) => {
    const { persal } = req.params;

    if (isNaN(persal)) {
        return res.status(400).send('Invalid Persal format');
    }

    try {
        const [results] = await pool.query('SELECT * FROM TEACHERS WHERE PERSAL = ?', [persal]);

        if (results.length === 0) {
            return res.status(404).send('Teacher not found');
        }

        res.json(results[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
};

// POST create a new teacher
const createTeacher = async (req, res) => {
    const { PERSAL, TITLE, INITIAL, SURNAME, DEPARTMENT, EMAIL, QUALIFICATION, StartDate } = req.body;

    if (!PERSAL || !TITLE || !INITIAL || !SURNAME || !DEPARTMENT || !EMAIL || !QUALIFICATION || !StartDate) {
        return res.status(400).send('Missing required fields');
    }

    if (isNaN(PERSAL) || isNaN(Date.parse(StartDate))) {
        return res.status(400).send('Invalid data format');
    }

    try {
        const [result] = await pool.query(
            'INSERT INTO TEACHERS (PERSAL, TITLE, INITIAL, SURNAME, DEPARTMENT, EMAIL, QUALIFICATION, StartDate) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [PERSAL, TITLE, INITIAL, SURNAME, DEPARTMENT, EMAIL, QUALIFICATION, StartDate]
        );
        res.status(201).json({ message: 'Teacher added successfully', insertId: result.insertId });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
};

// PUT update a teacher
const updateTeacher = async (req, res) => {
    const { persal } = req.params;
    const { TITLE, INITIAL, SURNAME, DEPARTMENT, EMAIL, QUALIFICATION, StartDate } = req.body;

    if (isNaN(persal) || !TITLE || !INITIAL || !SURNAME || !DEPARTMENT || !EMAIL) {
        return res.status(400).send('Invalid input data');
    }

    if (StartDate && isNaN(Date.parse(StartDate))) {
        return res.status(400).send('Invalid date format');
    }

    try {
        const [result] = await pool.query(
            'UPDATE TEACHERS SET TITLE = ?, INITIAL = ?, SURNAME = ?, DEPARTMENT = ?, EMAIL = ?, QUALIFICATION = ?, StartDate = ? WHERE PERSAL = ?',
            [TITLE, INITIAL, SURNAME, DEPARTMENT, EMAIL, QUALIFICATION, StartDate, persal]
        );

        if (result.affectedRows === 0) {
            return res.status(404).send('Teacher not found');
        }

        res.send('Teacher updated successfully');
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
};

// DELETE a teacher
const deleteTeacher = async (req, res) => {
    const { persal } = req.params;

    if (isNaN(persal)) {
        return res.status(400).send('Invalid Persal format');
    }

    try {
        const [result] = await pool.query('DELETE FROM TEACHERS WHERE PERSAL = ?', [persal]);

        if (result.affectedRows === 0) {
            return res.status(404).send('Teacher not found');
        }

        res.send('Teacher deleted successfully');
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = {
    getAllTeachers,
    getTeacherByPersal,
    createTeacher,
    updateTeacher,
    deleteTeacher
};
