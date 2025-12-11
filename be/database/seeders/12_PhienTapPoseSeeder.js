/**
 * SEEDER: 12_PhienTapPoseSeeder.js
 * Mục đích: Tạo dữ liệu tập luyện AI Pose.
 */

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const members = await queryInterface.sequelize.query(`SELECT TOP 3 id FROM nguoi_dungs WHERE email LIKE 'member%@test.com';`);

        if (members[0].length === 0) return;

        const poses = [];
        members[0].forEach(m => {
            poses.push({
                id_thanh_vien: m.id,
                ten_bai_tap: 'Squat',
                thoi_gian_bat_dau: new Date(),
                thoi_gian_ket_thuc: new Date(new Date().getTime() + 10 * 60 * 1000), // 10 mins
                tong_ket_ket_qua: 'Good form',
                duong_dan_video: '/uploads/pose1.mp4',
                ngay_tao: new Date()
            });
        });

        await queryInterface.bulkInsert('phien_tap_pose', poses, {});
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('phien_tap_pose', null, {});
    }
};
