const express = require('express');
const router = express.Router();
const learnersController = require('../controllers/teachersController');

router.get('/', learnersController.getAllTeachers);
router.post('/', learnersController.createTeachers);
router.put('/:id', learnersController.updateTeachers);
router.delete('/:id', learnersController.deleteTeachers);

module.exports = router;