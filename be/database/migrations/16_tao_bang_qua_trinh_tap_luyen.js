/**
 * MIGRATION: 16_tao_bang_qua_trinh_tap_luyen.js
 * Bảng: qua_trinh_tap_luyen (progress_records)
 * Mục đích: Theo dõi sức khỏe hội viên (Cân nặng, BMI...).
 */

const { Sequelize, DataTypes } = require('sequelize');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('qua_trinh_tap_luyen', {
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
            ngay_ghi_nhan: {
                type: DataTypes.DATEONLY,
                allowNull: false
            },
            loai_chi_so: { // metric_type e.g., weight, height, body_fat
                type: DataTypes.STRING(50),
                allowNull: false
            },
            gia_tri: { // value
                type: DataTypes.FLOAT,
                allowNull: false
            },
            don_vi: { // unit
                type: DataTypes.STRING(20),
                allowNull: true
            },
            nguon: { // source (manual, ai, device)
                type: DataTypes.STRING(50),
                allowNull: false
            },
            nguoi_tao: {
                type: DataTypes.BIGINT,
                allowNull: false,
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
        await queryInterface.dropTable('qua_trinh_tap_luyen');
    }
};
