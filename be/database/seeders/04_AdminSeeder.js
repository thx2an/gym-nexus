/**
 * SEEDER: 04_AdminSeeder.js
 * Mục đích: Tạo tài khoản Admin.
 */

const bcrypt = require('bcryptjs'); // Assuming project uses bcryptjs (Standard for Node)

module.exports = {
    up: async (queryInterface, Sequelize) => {
        // Lấy ID role ADMIN
        const roles = await queryInterface.sequelize.query(
            `SELECT id FROM chuc_vus WHERE ma_chuc_vu = 'ADMIN';`
        );
        const adminRoleId = roles[0][0].id;

        const hash = await bcrypt.hash('Admin@123', 10);

        await queryInterface.bulkInsert('nguoi_dungs', [
            {
                ho_ten: 'Quản Trị Hệ Thống',
                email: 'admin@gymnexus.com',
                so_dien_thoai: '0901234567',
                mat_khau: hash,
                gioi_tinh: 'Nam',
                ngay_sinh: '1990-01-01',
                trang_thai: 'active',
                id_chuc_vu: adminRoleId,
                ngay_tao: new Date(),
                ngay_cap_nhat: new Date()
            }
        ], {});
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('nguoi_dungs', { email: 'admin@gymnexus.com' }, {});
    }
};
