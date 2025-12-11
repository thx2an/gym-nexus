/**
 * MIGRATION: 06_tao_bang_the_thanh_viens.js
 * Bảng: the_thanh_viens (memberships)
 * Mục đích: Quản lý thẻ thành viên/đăng ký của người dùng.
 */

const { Sequelize, DataTypes } = require('sequelize');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('the_thanh_viens', {
            id: { // membership_id
                type: DataTypes.BIGINT,
                primaryKey: true,
                autoIncrement: true
            },
            id_nguoi_dung: {
                type: DataTypes.BIGINT,
                allowNull: false,
                references: {
                    model: 'nguoi_dungs',
                    key: 'id'
                },
                onDelete: 'CASCADE'
            },
            id_goi_tap: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'goi_tap_luyens',
                    key: 'id'
                },
                onDelete: 'CASCADE'
            },
            ngay_bat_dau: {
                type: DataTypes.DATEONLY,
                allowNull: false
            },
            ngay_ket_thuc: {
                type: DataTypes.DATEONLY,
                allowNull: false
            },
            trang_thai: {
                type: DataTypes.ENUM('pending', 'active', 'expired', 'canceled'),
                defaultValue: 'pending'
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
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('the_thanh_viens');
    }
};
