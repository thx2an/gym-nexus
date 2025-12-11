/**
 * MIGRATION: 13_tao_bang_thanh_toan.js
 * Bảng: thanh_toan (payments)
 * Mục đích: Quản lý giao dịch thanh toán.
 */

const { Sequelize, DataTypes } = require('sequelize');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('thanh_toan', {
            id: {
                type: DataTypes.BIGINT,
                primaryKey: true,
                autoIncrement: true
            },
            id_thanh_vien: {
                type: DataTypes.BIGINT,
                allowNull: true,
                references: {
                    model: 'nguoi_dungs',
                    key: 'id'
                }
            },
            so_tien: {
                type: DataTypes.DECIMAL(18, 2),
                allowNull: false
            },
            loai_tien: { // currency
                type: DataTypes.STRING(10),
                allowNull: false
            },
            trang_thai: {
                type: DataTypes.ENUM('pending', 'success', 'failed', 'refunded'),
                allowNull: false
            },
            phuong_thuc: { // method
                type: DataTypes.STRING(50),
                allowNull: true
            },
            cong_thanh_toan: { // gateway
                type: DataTypes.STRING(50),
                allowNull: true
            },
            ma_giao_dich_cong: { // gateway_transaction_id
                type: DataTypes.STRING(255),
                allowNull: false
            },
            id_the_thanh_vien: { // membership_id
                type: DataTypes.BIGINT,
                allowNull: true,
                references: {
                    model: 'the_thanh_viens',
                    key: 'id'
                }
            },
            id_buoi_tap: { // session_id
                type: DataTypes.BIGINT,
                allowNull: true,
                references: {
                    model: 'buoi_taps',
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
        await queryInterface.dropTable('thanh_toan');
    }
};
