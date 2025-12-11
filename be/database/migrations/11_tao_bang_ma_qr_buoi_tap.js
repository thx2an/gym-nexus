/**
 * MIGRATION: 11_tao_bang_ma_qr_buoi_tap.js
 * Bảng: ma_qr_buoi_tap (session_qr_tokens)
 * Mục đích: Tạo mã QR để điểm danh buổi tập.
 */

const { Sequelize, DataTypes } = require('sequelize');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('ma_qr_buoi_tap', {
            id: {
                type: DataTypes.BIGINT,
                primaryKey: true,
                autoIncrement: true
            },
            id_buoi_tap: {
                type: DataTypes.BIGINT,
                allowNull: false,
                references: {
                    model: 'buoi_taps',
                    key: 'id'
                },
                onDelete: 'CASCADE'
            },
            token: {
                type: DataTypes.STRING(255),
                allowNull: false,
                unique: true
            },
            tao_luc: {
                type: DataTypes.DATE,
                allowNull: false
            },
            het_han_luc: {
                type: DataTypes.DATE,
                allowNull: false
            },
            da_su_dung: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            }
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('ma_qr_buoi_tap');
    }
};
