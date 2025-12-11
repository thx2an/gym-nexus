/**
 * MIGRATION: 14_tao_bang_hoa_don.js
 * Bảng: hoa_don (invoices)
 * Mục đích: Lưu hóa đơn xuất ra cho khách.
 */

const { Sequelize, DataTypes } = require('sequelize');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('hoa_don', {
            id: {
                type: DataTypes.BIGINT,
                primaryKey: true,
                autoIncrement: true
            },
            id_thanh_toan: {
                type: DataTypes.BIGINT,
                allowNull: false,
                references: {
                    model: 'thanh_toan',
                    key: 'id'
                }
            },
            ma_hoa_don: { // invoice_number
                type: DataTypes.STRING(100),
                allowNull: false,
                unique: true
            },
            ngay_xuat: {
                type: DataTypes.DATE,
                allowNull: false
            },
            tong_tien: {
                type: DataTypes.DECIMAL(18, 2),
                allowNull: false
            },
            duong_dan_file: { // file_path
                type: DataTypes.STRING(255),
                allowNull: true
            }
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('hoa_don');
    }
};
