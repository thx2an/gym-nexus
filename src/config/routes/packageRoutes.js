const express = require('express');
const router = express.Router();
const packageController = require('../controllers/packageController');

// Tạo đường dẫn: /api/packages
router.get('/packages', packageController.getAllPackages);

module.exports = router;