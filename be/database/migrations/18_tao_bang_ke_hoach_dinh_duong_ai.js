/**
 * MIGRATION: 18_tao_bang_ke_hoach_dinh_duong_ai.js
 * Bảng: ke_hoach_dinh_duong_ai (ai_nutrition_plans)
 * Mục đích: Lưu kế hoạch dinh dưỡng do AI đề xuất.
 */

const { Sequelize, DataTypes } = require('sequelize');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('ke_hoach_dinh_duong_ai', {
            id: {
                type: DataTypes.BIGINT,
                primaryKey: true,
                autoIncrement: true
            },
            id_thanh_vien: {
                type: DataTypes.BIGINT,
                allowNull: false,
                references: {
                    model: 'nguoi_dungs',
                    key: 'id'
                }
            },
            calo_hang_ngay: { // daily_calories
                type: DataTypes.INTEGER,
                allowNull: true
            },
            macro_json: { // macro targets
                type: DataTypes.TEXT,
                allowNull: true
            },
            ke_hoach_json: { // meals plan
                type: DataTypes.TEXT,
                allowNull: true
            },
            nguoi_tao: {
                type: DataTypes.BIGINT,
                allowNull: true,
                references: {
                    model: 'nguoi_dungs',
                    key: 'id'
                }
            },
            ngay_tao: {
                type: DataTypes.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            }
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('ke_hoach_dinh_duong_ai');
    }
};
