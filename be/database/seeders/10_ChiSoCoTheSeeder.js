/**
 * SEEDER: 10_ChiSoCoTheSeeder.js
 * Mục đích: Tạo dữ liệu cân nặng/BMI mẫu.
 */

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const members = await queryInterface.sequelize.query(`SELECT TOP 10 id FROM nguoi_dungs WHERE email LIKE 'member%@test.com';`);
        const admins = await queryInterface.sequelize.query(`SELECT id FROM nguoi_dungs WHERE email = 'admin@gymnexus.com';`);
        const adminId = admins[0][0].id;

        if (members[0].length === 0) return;

        const records = [];
        members[0].forEach(m => {
            // Month 1
            records.push({
                id_thanh_vien: m.id,
                ngay_ghi_nhan: '2025-01-01',
                loai_chi_so: 'weight',
                gia_tri: 75.5,
                don_vi: 'kg',
                nguon: 'manual',
                nguoi_tao: adminId,
                ngay_tao: new Date()
            });
            // Month 2
            records.push({
                id_thanh_vien: m.id,
                ngay_ghi_nhan: '2025-02-01',
                loai_chi_so: 'weight',
                gia_tri: 74.0,
                don_vi: 'kg',
                nguon: 'manual',
                nguoi_tao: adminId,
                ngay_tao: new Date()
            });
        });

        await queryInterface.bulkInsert('qua_trinh_tap_luyen', records, {});
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('qua_trinh_tap_luyen', null, {});
    }
};
