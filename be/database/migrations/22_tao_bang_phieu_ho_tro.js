/**
 * MIGRATION: 22_tao_bang_phieu_ho_tro.js
 * Bảng: phieu_ho_tro (support_tickets)
 * Mục đích: Quản lý ticket hỗ trợ kỹ thuật/khiếu nại.
 */

const { Sequelize, DataTypes } = require('sequelize');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('phieu_ho_tro', {
            id: {
                type: DataTypes.BIGINT,
                primaryKey: true,
                autoIncrement: true
            },
            id_nguoi_gui: { // member_id
                type: DataTypes.BIGINT,
                allowNull: false,
                references: {
                    model: 'nguoi_dungs',
                    key: 'id'
                }
            },
            tieu_de: { // subject
                type: DataTypes.STRING(255),
                allowNull: true
            },
            danh_muc: { // category
                type: DataTypes.STRING(100),
                allowNull: true
            },
            trang_thai: {
                type: DataTypes.ENUM('open', 'in_progress', 'waiting', 'resolved', 'closed'),
                allowNull: false
            },
            muc_do: { // priority
                type: DataTypes.ENUM('low', 'medium', 'high'),
                allowNull: true
            },
            nguoi_xu_ly: { // assigned_to
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
            },
            ngay_cap_nhat: {
                type: DataTypes.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            }
        });

        await queryInterface.addIndex('phieu_ho_tro', ['trang_thai']);
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('phieu_ho_tro');
    }
};
