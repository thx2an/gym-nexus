const express = require('express');
const router = express.Router();
const staffController = require('../controllers/staffController');

router.get('/', staffController.getAllStaff);
router.post('/', staffController.createStaffAccount);
router.delete('/:id', staffController.deleteStaffAccount);

module.exports = router;