const express = require('express');
const router = express.Router();

// Import Controllers
// const UserController = require('../app/Http/Controllers/UserController');
const ChiNhanhController = require('../app/Http/Controllers/ChiNhanhController');

// Define Routes
router.get('/', (req, res) => {
    res.json({ message: 'Welcome to GymNexus API' });
});

// Route giống Laravel: Route::get('/admin/chi-nhanh/get-data', ...)
router.get('/admin/chi-nhanh/get-data', ChiNhanhController.getData);

module.exports = router;
