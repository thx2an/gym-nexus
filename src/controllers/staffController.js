const StaffModel = require('../models/staffModel');
const bcrypt = require('bcryptjs'); // Dùng thư viện bảo mật

const staffController = {
    // Lấy danh sách
    getAllStaff: async (req, res) => {
        try {
            const result = await StaffModel.getAllStaff();
            res.status(200).json({ success: true, count: result.recordset.length, data: result.recordset });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    },

    // Tạo nhân viên mới
    createStaffAccount: async (req, res) => {
        try {
            const { full_name, email, phone, role_code, branch_id, password, specialization, bio } = req.body;

            // 1. Validate
            if (!full_name || !email || !password || !role_code) {
                return res.status(400).json({ success: false, message: 'Thiếu thông tin bắt buộc' });
            }

            // 2. Hash Password (Bảo mật)
            const salt = await bcrypt.genSalt(10);
            const password_hash = await bcrypt.hash(password, salt);

            // 3. Gọi Model xử lý Transaction DB
            const newStaffId = await StaffModel.createStaff({
                full_name, email, phone, role_code, branch_id, password_hash, specialization, bio
            });

            res.status(201).json({ success: true, message: 'Tạo nhân viên thành công', staffId: newStaffId });

        } catch (error) {
            // Lỗi trùng lặp (Unique key)
            if (error.number === 2627) {
                return res.status(409).json({ success: false, message: 'Email hoặc SĐT đã tồn tại' });
            }
            res.status(500).json({ success: false, message: error.message });
        }
    },

    // Xóa (Khóa) nhân viên
    deleteStaffAccount: async (req, res) => {
        try {
            const { id } = req.params;
            await StaffModel.deactivateStaff(id);
            res.status(200).json({ success: true, message: 'Đã khóa tài khoản nhân viên' });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
};

module.exports = staffController;