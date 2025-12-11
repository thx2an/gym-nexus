/**
 * MIGRATION: 17_tao_bang_ke_hoach_tap_ai.js
 * Bảng: ke_hoach_tap_ai (ai_workout_plans)
 * Mục đích: Lưu kế hoạch tập luyện do AI tạo ra.
 */

const { Sequelize, DataTypes } = require('sequelize');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('ke_hoach_tap_ai', {
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
            muc_tieu: { // goal
                type: DataTypes.STRING(255),
                allowNull: true
            },
            thoi_gian_tuan: { // duration_weeks
                type: DataTypes.INTEGER,
                allowNull: true
            },
            ke_hoach_json: { // plan_json
                type: DataTypes.TEXT,
                allowNull: true
            },
            nguon: { // source
                type: DataTypes.ENUM('ai', 'pt'),
                allowNull: false
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
        await queryInterface.dropTable('ke_hoach_tap_ai');
    }
};
