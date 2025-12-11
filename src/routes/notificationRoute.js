const express = require('express');
const router = express.Router();
const notiController = require('../controllers/notificationController');

router.get('/', notiController.getMyNotifications);
router.post('/', notiController.createNotification);
router.put('/:id/read', notiController.markRead);

module.exports = router;