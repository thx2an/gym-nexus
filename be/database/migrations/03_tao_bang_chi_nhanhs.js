/**
 * MIGRATION: 03_tao_bang_quan_ly_nguoi_dung_chi_nhanh.js
 * Bảng: quan_ly_nguoi_dung_chi_nhanh (user_branch)
 * Mục đích: Phân quyền quản lý/nhân viên thuộc chi nhánh nào.
 */

const { Sequelize, DataTypes } = require('sequelize');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        // Note: This relies on 'chi_nhanhs' table existing, which is created in migration 04.
        // In a real runner, order matters. We will assume 04 runs before or we use FK constraints added later.
        // However, for this task, I will define the table structure but beware of FK creation order.
        // Ideally I should create 04_chi_nhanhs BEFORE 03 or combine them.
        // To be safe, I will change the logic: I will assume the runner sorts by filename.
        // But since I'm generating files now, I should probably generate 04 first?
        // Let's rely on standard migration systems handling FKs or create FKs in a separate step?
        // No, standard is numeric prefix.

        // I will actually write 04 first to be safe in the next step, but here I'm writing 03.
        // To solve this circular dependency (if any), I will remove the FK constraint strictly here OR
        // just accept that users will run all migrations.

        // Actually, user_branch depends on branches.
        // I will rename this file conceptually to run AFTER branches?
        // Or simpler: I will just creating the file 03 here, but in the content, I will references 'chi_nhanhs'.
        // If Sequelize runs logically, it might fail if 'chi_nhanhs' doesn't exist.
        // PROPOSAL: I will change the numbering in the file name to 04b maybe? 
        // Or better, let's just make 'tao_bang_chi_nhanhs' be 03 and this be 04.

        // RE-PLANNING ON THE FLY: I will stick to the plan but make sure I create the referenced tables.
        // Oops, Plan said:
        // 03_tao_bang_quan_ly_users_branch
        // 04_tao_bang_chi_nhanhs

        // This is a Logic Error in implementation plan ordering.
        // I will write the 'chi_nhanhs' MIGRATION NOW (as 03) and swap them.

        // ... Actually, I'll just write 03 as 'chi_nhanhs' and 04 as relation.

        // But for now, let's write 03 as 'chi_nhanhs' to be safe.

        await queryInterface.createTable('chi_nhanhs', { // branches
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            ten_chi_nhanh: { // name
                type: DataTypes.STRING(150),
                allowNull: false
            },
            dia_chi: { // address
                type: DataTypes.STRING(255),
                allowNull: false
            },
            so_dien_thoai: { // phone
                type: DataTypes.STRING(20),
                allowNull: true
            },
            dang_hoat_dong: { // is_active
                type: DataTypes.BOOLEAN,
                defaultValue: true
            },
            ngay_tao: {
                type: DataTypes.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            }
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('chi_nhanhs');
    }
};
