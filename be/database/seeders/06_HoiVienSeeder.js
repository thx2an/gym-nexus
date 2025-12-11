/**
 * SEEDER: 06_HoiVienSeeder.js
 * Mục đích: Tạo 20 hội viên mẫu.
 */

const bcrypt = require('bcryptjs');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const roles = await queryInterface.sequelize.query(
            `SELECT id FROM chuc_vus WHERE ma_chuc_vu = 'HOI_VIEN';`
        );
        const memberRoleId = roles[0][0].id;
        const hash = await bcrypt.hash('123456', 10);

        const members = [];
        for (let i = 1; i <= 20; i++) {
            members.push({
                ho_ten: `Hội Viên Test ${i}`,
                email: `member${i}@test.com`,
                so_dien_thoai: `09000000${i.toString().padStart(2, '0')}`,
                mat_khau: hash,
                gioi_tinh: i % 3 === 0 ? 'Nu' : 'Nam',
                trang_thai: 'active',
                id_chuc_vu: memberRoleId,
                ngay_tao: new Date(),
                ngay_cap_nhat: new Date()
            });
        }

        await queryInterface.bulkInsert('nguoi_dungs', members, {});
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('nguoi_dungs', { email: { [Sequelize.Op.like]: 'member%@test.com' } }, {});
    }
};
