const NotificationModel = require('../models/notificationModel');

const notificationController = {
    getMyNotifications: async (req, res) => {
        try {
            const userId = req.query.userId || 1; 
            const data = await NotificationModel.getByUserId(userId);
            res.status(200).json({ success: true, data });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    },

    createNotification: async (req, res) => {
        try {
            const { user_id, title, message, type } = req.body;
            if (!user_id || !title || !message) {
                return res.status(400).json({ success: false, message: 'Thiếu thông tin' });
            }
            await NotificationModel.create({ user_id, title, message, type });
            res.status(201).json({ success: true, message: 'Đã gửi thông báo' });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    },

    markRead: async (req, res) => {
        try {
            const { id } = req.params; 
            const userId = req.body.userId || 1; 
            
            await NotificationModel.markAsRead(userId, id);
            res.status(200).json({ success: true, message: 'Cập nhật trạng thái thành công' });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
};

module.exports = notificationController;