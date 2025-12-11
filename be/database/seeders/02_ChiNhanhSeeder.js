/**
 * SEEDER: 02_ChiNhanhSeeder.js
 * Mục đích: Tạo dữ liệu chi nhánh.
 */

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('chi_nhanhs', [
            {
                ten_chi_nhanh: 'GymNexus Quận 1',
                dia_chi: '123 Nguyễn Huệ, Quận 1, TP.HCM',
                so_dien_thoai: '0281234567',
                dang_hoat_dong: true,
                ngay_tao: new Date()
            },
            {
                ten_chi_nhanh: 'GymNexus Quận 7',
                dia_chi: '456 Nguyễn Văn Linh, Quận 7, TP.HCM',
                so_dien_thoai: '0287654321',
                dang_hoat_dong: true,
                ngay_tao: new Date()
            },
            {
                ten_chi_nhanh: 'GymNexus Cầu Giấy',
                dia_chi: '789 Cầu Giấy, Hà Nội',
                so_dien_thoai: '0241234567',
                dang_hoat_dong: true,
                ngay_tao: new Date()
            }
        ], {});
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('chi_nhanhs', null, {});
    }
};
