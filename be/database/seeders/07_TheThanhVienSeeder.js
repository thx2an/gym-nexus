/**
 * SEEDER: 07_TheThanhVienSeeder.js
 * Mục đích: Gán gói tập cho hội viên.
 */

module.exports = {
    up: async (queryInterface, Sequelize) => {
        // Lấy members
        const members = await queryInterface.sequelize.query(
            `SELECT id FROM nguoi_dungs WHERE email LIKE 'member%@test.com';`
        );
        // Lấy gói tập
        const packages = await queryInterface.sequelize.query(
            `SELECT TOP 3 id FROM goi_tap_luyens;`
        );
        // Note: query returns [rows, metadata], so we use members[0]

        const memberships = members[0].map((m, index) => {
            const packageId = packages[0][index % 3].id;
            return {
                id_nguoi_dung: m.id,
                id_goi_tap: packageId,
                ngay_bat_dau: new Date(),
                ngay_ket_thuc: new Date(new Date().setMonth(new Date().getMonth() + 1)), // +1 month rough
                trang_thai: 'active',
                ngay_tao: new Date(),
                ngay_cap_nhat: new Date()
            };
        });

        await queryInterface.bulkInsert('the_thanh_viens', memberships, {});
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('the_thanh_viens', null, {});
    }
};
