const express = require('express');
const router = express.Router();
const learnersController = require('../controllers/learnersController');

router.get('/', learnersController.getAllLearners);
router.post('/', learnersController.createLearner);
router.put('/:id', learnersController.updateLearner);
router.delete('/:id', learnersController.deleteLearner);

module.exports = router;