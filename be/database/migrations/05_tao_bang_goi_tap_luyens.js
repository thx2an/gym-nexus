/**
 * MIGRATION: 05_tao_bang_goi_tap_luyens.js
 * Bảng: goi_tap_luyens (membership_packages)
 * Mục đích: Quản lý các gói tập (Ví dụ: 1 tháng, 6 tháng, VIP).
 */

const { Sequelize, DataTypes } = require('sequelize');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('goi_tap_luyens', {
            id: { // package_id
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            ma_goi: { // code
                type: DataTypes.STRING(50),
                allowNull: false,
                unique: true
            },
            ten_goi: { // name
                type: DataTypes.STRING(100),
                allowNull: false
            },
            mo_ta: { // description
                type: DataTypes.TEXT,
                allowNull: true
            },
            thoi_han_ngay: { // duration_days
                type: DataTypes.INTEGER,
                allowNull: false
            },
            gia: { // price
                type: DataTypes.DECIMAL(18, 2),
                allowNull: false
            },
            quyen_loi: { // benefits
                type: DataTypes.TEXT,
                allowNull: true
            },
            dang_hoat_dong: { // is_active
                type: DataTypes.BOOLEAN,
                defaultValue: true
            }
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('goi_tap_luyens');
    }
};
