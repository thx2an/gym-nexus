/**
 * SEEDER: 13_BaiVietKienThucSeeder.js
 * Mục đích: Tạo bài viết FAQ/Hướng dẫn.
 */

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const admins = await queryInterface.sequelize.query(`SELECT id FROM nguoi_dungs WHERE email = 'admin@gymnexus.com';`);
        const adminId = admins[0][0].id;

        await queryInterface.bulkInsert('bai_viet_kien_thuc', [
            {
                tieu_de: 'Hướng dẫn đặt lịch PT',
                noi_dung: 'Bước 1: Chọn PT. Bước 2: Chọn giờ...',
                danh_muc: 'Hướng dẫn',
                trang_thai: 'published',
                nguoi_tao: adminId,
                ngay_tao: new Date(),
                ngay_cap_nhat: new Date()
            },
            {
                tieu_de: 'Chính sách hoàn tiền',
                noi_dung: 'Hoàn tiền trong 3 ngày đầu...',
                danh_muc: 'Chính sách',
                trang_thai: 'published',
                nguoi_tao: adminId,
                ngay_tao: new Date(),
                ngay_cap_nhat: new Date()
            }
        ], {});
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('bai_viet_kien_thuc', null, {});
    }
};
