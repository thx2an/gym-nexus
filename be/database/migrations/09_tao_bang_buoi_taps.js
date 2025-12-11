/**
 * MIGRATION: 09_tao_bang_buoi_taps.js
 * Bảng: buoi_taps (training_sessions)
 * Mục đích: Quản lý các buổi tập giữa PT và Hội viên.
 */

const { Sequelize, DataTypes } = require('sequelize');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('buoi_taps', {
            id: {
                type: DataTypes.BIGINT,
                primaryKey: true,
                autoIncrement: true
            },
            id_thanh_vien: { // member_id
                type: DataTypes.BIGINT,
                allowNull: false,
                references: {
                    model: 'nguoi_dungs',
                    key: 'id'
                }
            },
            id_pt: { // trainer_id
                type: DataTypes.BIGINT,
                allowNull: false,
                references: {
                    model: 'ho_so_pt',
                    key: 'id'
                }
            },
            id_chi_nhanh: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'chi_nhanhs',
                    key: 'id'
                }
            },
            thoi_gian_bat_dau: {
                type: DataTypes.DATE, // DateTime
                allowNull: false
            },
            thoi_gian_ket_thuc: {
                type: DataTypes.DATE,
                allowNull: false
            },
            trang_thai: {
                type: DataTypes.ENUM('pending', 'confirmed', 'canceled', 'completed'),
                allowNull: false
            },
            ghi_chu: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            ngay_tao: {
                type: DataTypes.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            }
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('buoi_taps');
    }
};
