const pool = require('../db/connection');

const getAllTeachers = async (req, res) => {
    try {
        const [results] = await pool.query('SELECT * FROM TEACHERS');
        res.json(results);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
};

const getTeacherById = async (req, res) => {
    try {
        const [results] = await pool.query('SELECT * FROM TAECHERS WHERE ID = ?', [req.params.id]);
    if (results.length ===0) {
            return res.status(404).send('Teacher not found');
        }
        res.json(results[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
};



const createTeacher = async (req, res) => {
    try {
        const [result] = await pool.query('INSERT INTO TEACHERS SET ?', [req.body]);
        res.status(201).json({ message: 'Teacher added successfully', insertId: result.insertId });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
};


const updateTeacher = async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await pool.query('UPDATE TEACHERS SET ? WHERE ID = ?', [req.body, id]);

        if (result.affectedRows === 0) {
            return res.status(404).send('Teacher not found');
        }

        res.send('Teacher updated successfully');
    } catch {
        res.status(500).send('Internal Server Error');
    }
};



const deleteTeacher = async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await pool.query('DELETE FROM TEACHERS WHERE ID = ?', [id]);

        if (result.affectedRows) {
            return res.send('Teacher deleted successfully');
        }

        res.status(404).send('Teacher not found');
    } catch {
        res.status(500).send('Internal Server Error');
    }
};



module.exports = {
    getAllTeachers,
    getTeacherById,
    createTeacher,
    updateTeacher,
    deleteTeacher
};
