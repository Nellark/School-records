const pool = require('../db/connection');

const getAllLearners = async (req, res) => {
    try {
        const [results] = await pool.query('SELECT * FROM LEARNERS');
        res.json(results);
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
};

const getLearnerById = async (req, res) => {
    const id = req.params.id;
    if (isNaN(id)) return res.status(400).send('Invalid ID format');
    try {
        const [results] = await pool.query('SELECT * FROM LEARNERS WHERE ID = ?', [id]);
        if (results.length === 0) return res.status(404).send('Learner not found');
        res.json(results[0]);
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
};

const createLearner = async (req, res) => {
    const { NAME, SURNAME, GRADE, CLASS } = req.body;
    if (!NAME || !SURNAME || !GRADE || !CLASS) return res.status(400).send('Missing fields');
    try {
        const result = await pool.query(
            'INSERT INTO LEARNERS (NAME, SURNAME, GRADE, CLASS) VALUES (?, ?, ?, ?)',
            [NAME, SURNAME, GRADE, CLASS]
        );
        res.status(201).json({ message: 'Learner added', id: result[0].insertId });
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
};

const updateLearner = async (req, res) => {
    const id = req.params.id;
    const { NAME, SURNAME, GRADE, CLASS } = req.body;
    if (isNaN(id) || !NAME || !SURNAME || !GRADE || !CLASS) return res.status(400).send('Invalid data');
    try {
        const result = await pool.query(
            'UPDATE LEARNERS SET NAME = ?, SURNAME = ?, GRADE = ?, CLASS = ? WHERE ID = ?',
            [NAME, SURNAME, GRADE, CLASS, id]
        );
        if (result[0].affectedRows === 0) return res.status(404).send('Learner not found');
        res.send('Learner updated');
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
};

const deleteLearner = async (req, res) => {
    const id = req.params.id;
    if (isNaN(id)) return res.status(400).send('Invalid ID format');
    try {
        const result = await pool.query('DELETE FROM LEARNERS WHERE ID = ?', [id]);
        if (result[0].affectedRows === 0) return res.status(404).send('Learner not found');
        res.send('Learner deleted');
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
};

module.exports = {
    getAllLearners,
    getLearnerById,
    createLearner,
    updateLearner,
    deleteLearner
};
