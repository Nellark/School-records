const pool = require('../db/connection');

const getAllTeachers = async (req, res) => {
    try {
        const [results] = await pool.query('SELECT * FROM TEACHERS');
        res.json(results);
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
};

const getTeacherByPersal = async (req, res) => {
    const persal = req.params.id;
    if (isNaN(persal)) return res.status(400).send('Invalid Persal format');
    try {
        const [results] = await pool.query('SELECT * FROM TEACHERS WHERE PERSAL = ?', [persal]);
        if (results.length === 0) return res.status(404).send('Teacher not found');
        res.json(results[0]);
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
};

const createTeacher = async (req, res) => {
    const { PERSAL, TITLE, INITIAL, SURNAME, DEPARTMENT, EMAIL, QUALIFICATION, StartDate } = req.body;
    if (!PERSAL || !TITLE || !INITIAL || !SURNAME || !DEPARTMENT || !EMAIL || !QUALIFICATION || !StartDate) {
        return res.status(400).send('Missing fields');
    }
    try {
        const result = await pool.query(
            'INSERT INTO TEACHERS (PERSAL, TITLE, INITIAL, SURNAME, DEPARTMENT, EMAIL, QUALIFICATION, StartDate) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [PERSAL, TITLE, INITIAL, SURNAME, DEPARTMENT, EMAIL, QUALIFICATION, StartDate]
        );
        res.status(201).json({ message: 'Teacher added', id: result[0].insertId });
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
};

const updateTeacher = async (req, res) => {
    const persal = req.params.id;
    const { TITLE, INITIAL, SURNAME, DEPARTMENT, EMAIL, QUALIFICATION, StartDate } = req.body;
    if (isNaN(persal) || !TITLE || !INITIAL || !SURNAME || !DEPARTMENT || !EMAIL || !QUALIFICATION || !StartDate) {
        return res.status(400).send('Invalid data');
    }
    try {
        const result = await pool.query(
            'UPDATE TEACHERS SET TITLE = ?, INITIAL = ?, SURNAME = ?, DEPARTMENT = ?, EMAIL = ?, QUALIFICATION = ?, StartDate = ? WHERE PERSAL = ?',
            [TITLE, INITIAL, SURNAME, DEPARTMENT, EMAIL, QUALIFICATION, StartDate, persal]
        );
        if (result[0].affectedRows === 0) return res.status(404).send('Teacher not found');
        res.send('Teacher updated');
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
};

const deleteTeacher = async (req, res) => {
    const persal = req.params.id;
    if (isNaN(persal)) return res.status(400).send('Invalid Persal format');
    try {
        const result = await pool.query('DELETE FROM TEACHERS WHERE PERSAL = ?', [persal]);
        if (result[0].affectedRows === 0) return res.status(404).send('Teacher not found');
        res.send('Teacher deleted');
    } catch (error) {
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
