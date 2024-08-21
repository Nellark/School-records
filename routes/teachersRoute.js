const express = require('express');
const router = express.Router();
const teachersController = require('../controllers/teachersController');


router.get('/', teachersController.getAllTeachers);
router.get('/:id', teachersController.getTeacherByPersal);
router.post('/', teachersController.createTeacher);
router.put('/:id', teachersController.updateTeacher);
router.delete('/:id', teachersController.deleteTeacher);

module.exports = router;

