/**
 * SEEDER: DatabaseSeeder.js
 * Mục đích: Chạy toàn bộ các seeder theo thứ tự chuẩn.
 * 
 * Cách chạy:
 * - Nếu dùng Sequelize CLI: Cần cấu hình .sequelizerc để trỏ tới file này (tuy nhiên CLI thường chạy tất cả file trong folder).
 * - Tốt nhất là dùng file này như một script runner riêng hoặc cấu hình trong package.json.
 */

const { Sequelize } = require('sequelize');
const sequelize = require('../../config/database');

const ChucVuSeeder = require('./01_ChucVuSeeder');
const ChiNhanhSeeder = require('./02_ChiNhanhSeeder');
const GoiTapSeeder = require('./03_GoiTapSeeder');
const AdminSeeder = require('./04_AdminSeeder');
const HuanLuyenVienSeeder = require('./05_HuanLuyenVienSeeder');
const HoiVienSeeder = require('./06_HoiVienSeeder');
const TheThanhVienSeeder = require('./07_TheThanhVienSeeder');
const LichLamVienPTSeeder = require('./08_LichLamVienPTSeeder');
const BuoiTapSeeder = require('./09_BuoiTapSeeder');
const ChiSoCoTheSeeder = require('./10_ChiSoCoTheSeeder');
const KeHoachAISeeder = require('./11_KeHoachAISeeder');
const PhienTapPoseSeeder = require('./12_PhienTapPoseSeeder');
const BaiVietKienThucSeeder = require('./13_BaiVietKienThucSeeder');
const TicketHoTroSeeder = require('./14_TicketHoTroSeeder');

const runSeeders = async () => {
    try {
        const queryInterface = sequelize.getQueryInterface();

        console.log('--- BẮT ĐẦU SEED DATA ---');

        console.log('1. Cấu hình hệ thống...');
        await ChucVuSeeder.up(queryInterface, Sequelize);
        await ChiNhanhSeeder.up(queryInterface, Sequelize);
        await GoiTapSeeder.up(queryInterface, Sequelize);

        console.log('2. Người dùng & Nhân sự...');
        await AdminSeeder.up(queryInterface, Sequelize);
        await HuanLuyenVienSeeder.up(queryInterface, Sequelize);
        await HoiVienSeeder.up(queryInterface, Sequelize);

        console.log('3. Vận hành (Thẻ, Lịch, Buổi tập)...');
        await TheThanhVienSeeder.up(queryInterface, Sequelize);
        await LichLamVienPTSeeder.up(queryInterface, Sequelize);
        await BuoiTapSeeder.up(queryInterface, Sequelize);

        console.log('4. AI & Sức khỏe...');
        await ChiSoCoTheSeeder.up(queryInterface, Sequelize);
        await KeHoachAISeeder.up(queryInterface, Sequelize);
        await PhienTapPoseSeeder.up(queryInterface, Sequelize);

        console.log('5. Support & Knowledge...');
        await BaiVietKienThucSeeder.up(queryInterface, Sequelize);
        await TicketHoTroSeeder.up(queryInterface, Sequelize);

        console.log('--- HOÀN TẤT SEED DATA THÀNH CÔNG ---');
        process.exit(0);

    } catch (error) {
        console.error('LỖI KHI SEED DATA:', error);
        process.exit(1);
    }
};

// Thực thi
runSeeders();
