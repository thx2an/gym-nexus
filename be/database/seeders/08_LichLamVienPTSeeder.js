/**
 * SEEDER: 08_LichLamVienPTSeeder.js
 * Mục đích: Tạo lịch làm việc cho PT.
 */

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const pts = await queryInterface.sequelize.query(`SELECT id FROM ho_so_pt;`);
        const branches = await queryInterface.sequelize.query(`SELECT TOP 1 id FROM chi_nhanhs;`);

        if (pts[0].length === 0 || branches[0].length === 0) return;

        const schedules = [];
        pts[0].forEach(pt => {
            // 2,4,6 Morning Shift
            schedules.push({
                id_pt: pt.id,
                id_chi_nhanh: branches[0][0].id,
                gio_bat_dau: '08:00:00',
                gio_ket_thuc: '12:00:00',
                lap_lai_hang_tuan: true,
                thu_trong_tuan: 2, // Monday? Depending on convention
                da_khoa: false
            });
            schedules.push({
                id_pt: pt.id,
                id_chi_nhanh: branches[0][0].id,
                gio_bat_dau: '08:00:00',
                gio_ket_thuc: '12:00:00',
                lap_lai_hang_tuan: true,
                thu_trong_tuan: 4,
                da_khoa: false
            });
            schedules.push({
                id_pt: pt.id,
                id_chi_nhanh: branches[0][0].id,
                gio_bat_dau: '08:00:00',
                gio_ket_thuc: '12:00:00',
                lap_lai_hang_tuan: true,
                thu_trong_tuan: 6,
                da_khoa: false
            });
        });

        await queryInterface.bulkInsert('lich_lam_viec_pt', schedules, {});
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('lich_lam_viec_pt', null, {});
    }
};
