/**
 * SEEDER: 01_ChucVuSeeder.js
 * Mục đích: Tạo dữ liệu vai trò ban đầu.
 */

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('chuc_vus', [
            {
                ma_chuc_vu: 'ADMIN',
                ten_chuc_vu: 'Quản trị viên',
                mo_ta: 'Quản lý toàn bộ hệ thống',
                ngay_tao: new Date(),
                ngay_cap_nhat: new Date()
            },
            {
                ma_chuc_vu: 'QUAN_LY', // MANAGER
                ten_chuc_vu: 'Quản lý chi nhánh',
                mo_ta: 'Quản lý hoạt động chi nhánh',
                ngay_tao: new Date(),
                ngay_cap_nhat: new Date()
            },
            {
                ma_chuc_vu: 'PT',
                ten_chuc_vu: 'Huấn luyện viên',
                mo_ta: 'Personal Trainer',
                ngay_tao: new Date(),
                ngay_cap_nhat: new Date()
            },
            {
                ma_chuc_vu: 'HOI_VIEN', // MEMBER
                ten_chuc_vu: 'Hội viên',
                mo_ta: 'Khách hàng tập luyện',
                ngay_tao: new Date(),
                ngay_cap_nhat: new Date()
            }
        ], {});
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('chuc_vus', null, {});
    }
};
