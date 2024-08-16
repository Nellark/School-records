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
    try {
        const [results] = await pool.query('SELECT * FROM LEARNERS WHERE ID = ?', [req.params.id]);
    if (results.length ===0) {
            return res.status(404).send('Learner not found');
        }
        res.json(results[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
};



const createLearner = async (req, res) => {
    try {
        const [result] = await pool.query('INSERT INTO LEARNERS SET ?', [req.body]);
        res.status(201).json({ message: 'Learner added successfully', insertId: result.insertId });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
};


const updateLearner = async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await pool.query('UPDATE LEARNERS SET ? WHERE ID = ?', [req.body, id]);

        if (result.affectedRows === 0) {
            return res.status(404).send('Learner not found');
        }

        res.send('Learner updated successfully');
    } catch {
        res.status(500).send('Internal Server Error');
    }
};



const deleteLearner = async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await pool.query('DELETE FROM LEARNERS WHERE ID = ?', [id]);

        if (result.affectedRows) {
            return res.send('Learner deleted successfully');
        }

        res.status(404).send('Learner not found');
    } catch {
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
