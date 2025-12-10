const express = require('express');
const router = express.Router();
const trainerController = require('../controllers/trainerController');

router.get('/', trainerController.getAllTrainers); // GET localhost:8080/api/trainers
router.post('/', trainerController.createTrainer); // POST localhost:8080/api/trainers

module.exports = router;