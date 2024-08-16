const pool = require('../db/connection');


const getAllLearners = async (req, res) => {
    try {
        const [results] = await pool.query('SELECT * FROM LEARNERS');
        res.json(results);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
};

const getLearnerById = async (req, res) => {
    const { id } = req.params;

    if (isNaN(id)) {
        return res.status(400).send('Invalid ID format');
    }

    try {
        const [results] = await pool.query('SELECT * FROM LEARNERS WHERE ID = ?', [id]);

        if (results.length === 0) {
            return res.status(404).send('Learner not found');
        }

        res.json(results[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
};


const createLearner = async (req, res) => {
    const { ID, NAME, SURNAME, GRADE, CLASS } = req.body;

    if (!ID || !NAME || !SURNAME || !GRADE || !CLASS) {
        return res.status(400).send('Missing required fields');
    }

    if (isNaN(ID) || isNaN(GRADE)) {
        return res.status(400).send('Invalid data format');
    }

    try {
        const [result] = await pool.query(
            'INSERT INTO LEARNERS (ID, NAME, SURNAME, GRADE, CLASS) VALUES (?, ?, ?, ?, ?)',
            [ID, NAME, SURNAME, GRADE, CLASS]
        );
        res.status(201).json({ message: 'Learner added successfully', insertId: result.insertId });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
};


const updateLearner = async (req, res) => {
    const { id } = req.params;
    const { NAME, SURNAME, GRADE, CLASS } = req.body;

    if (isNaN(id) || !NAME || !SURNAME || isNaN(GRADE) || !CLASS) {
        return res.status(400).send('Invalid input data');
    }

    try {
        const [result] = await pool.query(
            'UPDATE LEARNERS SET NAME = ?, SURNAME = ?, GRADE = ?, CLASS = ? WHERE ID = ?',
            [NAME, SURNAME, GRADE, CLASS, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).send('Learner not found');
        }

        res.send('Learner updated successfully');
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
};


const deleteLearner = async (req, res) => {
    const { id } = req.params;

    if (isNaN(id)) {
        return res.status(400).send('Invalid ID format');
    }

    try {
        const [result] = await pool.query('DELETE FROM LEARNERS WHERE ID = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).send('Learner not found');
        }

        res.send('Learner deleted successfully');
    } catch (err) {
        console.error(err);
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
