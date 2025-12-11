/**
 * SEEDER: 05_HuanLuyenVienSeeder.js
 * Mục đích: Tạo tài khoản PT và hồ sơ PT.
 */

const bcrypt = require('bcryptjs');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        // 1. Lấy ID role PT
        const roles = await queryInterface.sequelize.query(
            `SELECT id FROM chuc_vus WHERE ma_chuc_vu = 'PT';`
        );
        const ptRoleId = roles[0][0].id;
        const hash = await bcrypt.hash('123456', 10);

        // 2. Tạo User PT
        const ptUsers = [];
        for (let i = 1; i <= 5; i++) {
            ptUsers.push({
                ho_ten: `HLV Nguyễn Văn ${i}`,
                email: `pt${i}@gymnexus.com`,
                so_dien_thoai: `098765432${i}`,
                mat_khau: hash,
                gioi_tinh: i % 2 === 0 ? 'Nu' : 'Nam',
                trang_thai: 'active',
                id_chuc_vu: ptRoleId,
                ngay_tao: new Date(),
                ngay_cap_nhat: new Date()
            });
        }
        await queryInterface.bulkInsert('nguoi_dungs', ptUsers, {});

        // 3. Lấy ID các User vừa tạo để tạo HoSoPT
        // Note: This relies on email uniqueness to find ids
        const users = await queryInterface.sequelize.query(
            `SELECT id, email FROM nguoi_dungs WHERE email LIKE 'pt%@gymnexus.com';`
        );

        const profiles = users[0].map(u => ({
            id_nguoi_dung: u.id,
            chuyen_mon: 'Bodybuilding, Cardio, Yoga',
            gioi_thieu: '5 năm kinh nghiệm huấn luyện chuyên nghiệp.',
            kinh_nghiem_nam: 5
        }));

        await queryInterface.bulkInsert('ho_so_pt', profiles, {});
    },

    down: async (queryInterface, Sequelize) => {
        // Cascade delete handles profile deletion usually, but safer to delete users
        await queryInterface.bulkDelete('nguoi_dungs', { email: { [Sequelize.Op.like]: 'pt%@gymnexus.com' } }, {});
    }
};
