/**
 * SEEDER: 03_GoiTapSeeder.js
 * Mục đích: Tạo các gói tập mẫu.
 */

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('goi_tap_luyens', [
            {
                ma_goi: 'BASIC_1M',
                ten_goi: 'Cơ bản 1 Tháng',
                mo_ta: 'Tập gym cơ bản, 1 chi nhánh',
                thoi_han_ngay: 30,
                gia: 500000,
                quyen_loi: 'Sử dụng thiết bị gym, tủ đồ',
                dang_hoat_dong: true
            },
            {
                ma_goi: 'PREMIUM_1M',
                ten_goi: 'Cao cấp 1 Tháng',
                mo_ta: 'Tập mọi chi nhánh + Yoga',
                thoi_han_ngay: 30,
                gia: 900000,
                quyen_loi: 'Tất cả chi nhánh, Yoga, Sauna, Khăn tập',
                dang_hoat_dong: true
            },
            {
                ma_goi: 'VIP_1Y',
                ten_goi: 'VIP 1 Năm',
                mo_ta: 'Quyền lợi tối thượng',
                thoi_han_ngay: 365,
                gia: 10000000,
                quyen_loi: 'Toàn bộ quyền lợi + 12 buổi PT + Đồ uống miễn phí',
                dang_hoat_dong: true
            }
        ], {});
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('goi_tap_luyens', null, {});
    }
};
