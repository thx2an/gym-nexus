/**
 * SEEDER: 14_TicketHoTroSeeder.js
 * Mục đích: Tạo ticket hỗ trợ mẫu.
 */

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const members = await queryInterface.sequelize.query(`SELECT TOP 1 id FROM nguoi_dungs WHERE email LIKE 'member%@test.com';`);
        if (members[0].length === 0) return;
        const memberId = members[0][0].id;

        await queryInterface.bulkInsert('phieu_ho_tro', [
            {
                id_nguoi_gui: memberId,
                tieu_de: 'Lỗi không điểm danh được',
                danh_muc: 'Kỹ thuật',
                trang_thai: 'open',
                muc_do: 'high',
                ngay_tao: new Date(),
                ngay_cap_nhat: new Date()
            }
        ], {});
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('phieu_ho_tro', null, {});
    }
};
