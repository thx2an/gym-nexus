/**
 * MIGRATION: 01_tao_bang_chuc_vus.js
 * Bảng: chuc_vus (roles)
 * Mục đích: Quản lý các vai trò trong hệ thống (Admin, PT, Member, ...)
 */

const { Sequelize, DataTypes } = require('sequelize');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('chuc_vus', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            ma_chuc_vu: { // code
                type: DataTypes.STRING(50),
                allowNull: false,
                unique: true
            },
            ten_chuc_vu: { // name
                type: DataTypes.STRING(100),
                allowNull: false
            },
            mo_ta: {
                type: DataTypes.STRING(255),
                allowNull: true
            },
            ngay_tao: {
                type: DataTypes.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            },
            ngay_cap_nhat: {
                type: DataTypes.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            }
        });

        // Thêm index nếu cần
        await queryInterface.addIndex('chuc_vus', ['ma_chuc_vu']);
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('chuc_vus');
    }
};
