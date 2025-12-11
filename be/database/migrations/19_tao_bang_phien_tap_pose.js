/**
 * MIGRATION: 19_tao_bang_phien_tap_pose.js
 * Bảng: phien_tap_pose (pose_sessions)
 * Mục đích: Lưu phiên tập nhận diện tư thế AI.
 */

const { Sequelize, DataTypes } = require('sequelize');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('phien_tap_pose', {
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
            ten_bai_tap: { // exercise_name
                type: DataTypes.STRING(255),
                allowNull: true
            },
            thoi_gian_bat_dau: {
                type: DataTypes.DATE,
                allowNull: false
            },
            thoi_gian_ket_thuc: {
                type: DataTypes.DATE,
                allowNull: false
            },
            tong_ket_ket_qua: { // result_summary
                type: DataTypes.TEXT,
                allowNull: true
            },
            duong_dan_video: { // raw_data_ref
                type: DataTypes.STRING(255),
                allowNull: true
            },
            ngay_tao: {
                type: DataTypes.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            }
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('phien_tap_pose');
    }
};
