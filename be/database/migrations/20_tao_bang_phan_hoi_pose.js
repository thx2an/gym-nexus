/**
 * MIGRATION: 20_tao_bang_phan_hoi_pose.js
 * Bảng: phan_hoi_pose (pose_feedbacks)
 * Mục đích: Lưu feedback chi tiết từng giây của AI Pose.
 */

const { Sequelize, DataTypes } = require('sequelize');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('phan_hoi_pose', {
            id: {
                type: DataTypes.BIGINT,
                primaryKey: true,
                autoIncrement: true
            },
            id_phien_tap: { // pose_id
                type: DataTypes.BIGINT,
                allowNull: false,
                references: {
                    model: 'phien_tap_pose',
                    key: 'id'
                },
                onDelete: 'CASCADE'
            },
            thoi_diem: { // timestamp
                type: DataTypes.FLOAT,
                allowNull: true
            },
            loai_phan_hoi: { // feedback_type
                type: DataTypes.STRING(50),
                allowNull: true
            },
            noi_dung: { // message
                type: DataTypes.TEXT,
                allowNull: true
            }
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('phan_hoi_pose');
    }
};
