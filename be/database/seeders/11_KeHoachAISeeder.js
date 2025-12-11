/**
 * SEEDER: 11_KeHoachAISeeder.js
 * Mục đích: Tạo kế hoạch tập luyện/dinh dưỡng AI mẫu.
 */

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const members = await queryInterface.sequelize.query(`SELECT TOP 5 id FROM nguoi_dungs WHERE email LIKE 'member%@test.com';`);

        if (members[0].length === 0) return;

        const workoutPlans = members[0].map(m => ({
            id_thanh_vien: m.id,
            muc_tieu: 'Giảm cân',
            thoi_gian_tuan: 4,
            ke_hoach_json: JSON.stringify({ week1: 'Cardio', week2: 'HIIT' }),
            nguon: 'ai',
            nguoi_tao: null, // AI created
            ngay_tao: new Date()
        }));

        const nutritionPlans = members[0].map(m => ({
            id_thanh_vien: m.id,
            calo_hang_ngay: 2000,
            macro_json: JSON.stringify({ protein: 150, carbs: 200, fat: 60 }),
            ke_hoach_json: JSON.stringify({ breakfast: 'Oats', lunch: 'Chicken' }),
            nguoi_tao: null,
            ngay_tao: new Date()
        }));

        await queryInterface.bulkInsert('ke_hoach_tap_ai', workoutPlans, {});
        await queryInterface.bulkInsert('ke_hoach_dinh_duong_ai', nutritionPlans, {});
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('ke_hoach_tap_ai', null, {});
        await queryInterface.bulkDelete('ke_hoach_dinh_duong_ai', null, {});
    }
};
