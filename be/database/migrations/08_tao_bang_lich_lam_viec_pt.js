/**
 * MIGRATION: 08_tao_bang_lich_lam_viec_pt.js
 * Bảng: lich_lam_viec_pt (trainer_availability)
 * Mục đích: Quản lý lịch rảnh/lịch dạy của PT.
 */

const { Sequelize, DataTypes } = require('sequelize');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('lich_lam_viec_pt', {
            id: {
                type: DataTypes.BIGINT,
                primaryKey: true,
                autoIncrement: true
            },
            id_pt: { // trainer_id FK
                type: DataTypes.BIGINT,
                allowNull: false,
                references: {
                    model: 'ho_so_pt',
                    key: 'id'
                },
                onDelete: 'CASCADE'
            },
            id_chi_nhanh: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'chi_nhanhs',
                    key: 'id'
                },
                onDelete: 'CASCADE'
            },
            ngay: { // date (null if recurring pattern, but schema says date null)
                type: DataTypes.DATEONLY,
                allowNull: true
            },
            gio_bat_dau: {
                type: DataTypes.TIME,
                allowNull: false
            },
            gio_ket_thuc: {
                type: DataTypes.TIME,
                allowNull: false
            },
            lap_lai_hang_tuan: { // is_recurring
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
            thu_trong_tuan: { // day_of_week
                type: DataTypes.TINYINT, // 0-6 or 1-7
                allowNull: true
            },
            da_khoa: { // is_blocked
                type: DataTypes.BOOLEAN,
                defaultValue: false
            }
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('lich_lam_viec_pt');
    }
};
