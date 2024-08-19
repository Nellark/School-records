const pool = require('../db/connection');


const getAllLearners = async (req, res) => {
    try {
        const [results] = await pool.query('SELECT * FROM LEARNERS');
        res.json(results);
    } catch {
        res.status(500).send('Internal Server Error');
    }
};


const getlearnerById = async (req, res) => {
    const id  = req.params.id;
    if (isNaN(id)) return res.status(400).send('Invalid ID format');
    try {
        const [results] = await pool.query('SELECT * FROM LEARNERS WHERE ID = ?', [id]);
        if (results.length === 0) return res.status(404).send('Learner not found');
        res.json(results[0]);
    } catch {
        res.status(500).send('Internal Server Error');
    }
};


const createLearner = async (req, res) => {
    const { ID, NAME, SURNAME, GRADE, CLASS } = req.body;
    if (!ID || !NAME || !SURNAME || !GRADE || !CLASS) {
        return res.status(400).send('Missing fields');
    }
    try {
        const [existingId] = await pool.query('SELECT 1 FROM LEARNERS WHERE ID = ?', [id]);
        if (existingId.length > 0) return res.status(409).send('ID already exists');
    
        const result = await pool.query(
            'INSERT INTO LEARNERS (ID, NAME, SURNAME, GRADE, CLASS) VALUES (?, ?, ?, ?, ?)'
            [ID, NAME, SURNAME, GRADE, CLASS]
        );
        res.status(201).json( {message: 'Learner added', id: result.insertId });
    } catch {
        res.status(500).send('Internal Server Error');
    }
};


const updateLearner = async (req, res) => {
    const id  = req.params.id;
    const { ID, NAME, SURNAME, GRADE, CLASS } = req.body;
    if (isNaN(ID) || !NAME || !SURNAME || !GRADE || !CLASS ) {
        return res.status(400).send('Invalid data');
    }
    try {
        const result = await pool.query(
            'UPDATE LEARNERS SET  NAME = ?, SURNAME = ?, GRADE = ?, CLASS = ? WHERE ID = ?',
            [NAME, SURNAME, GRADE, CLASS]
        );
        if (result.affectedRows === 0) return res.status(404).send('Learner not found');
        res.send('Learner updated');
    } catch {
        res.status(500).send('Internal Server Error');
    }
};


const deleteLearner = async (req, res) => {
    const id  = req.params.id;
    if (isNaN(id)) return res.status(400).send('Invalid ID format');
    try {
        const result = await pool.query('DELETE FROM LEARNERS WHERE ID = ?', [id]);
        if (result.affectedRows === 0) return res.status(404).send('Learner not found');
        res.send('Learner deleted');
    } catch {
        res.status(500).send('Internal Server Error');
    }
};

module.exports = {
    getAllLearners,
    getlearnerById,
    createLearner,
    updateLearner,
    deleteLearner
};
