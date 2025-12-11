/**
 * MIGRATION: 04_tao_bang_quan_ly_nguoi_dung_chi_nhanh.js
 * Bảng: quan_ly_nguoi_dung_chi_nhanh (user_branch)
 * Mục đích: Liên kết User (Nhân viên) với Chi nhánh.
 */

const { Sequelize, DataTypes } = require('sequelize');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('quan_ly_nguoi_dung_chi_nhanh', {
            id_nguoi_dung: {
                type: DataTypes.BIGINT,
                allowNull: false,
                references: {
                    model: 'nguoi_dungs',
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
            la_chi_nhanh_chinh: { // primary_flag
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
            createdAt: {
                type: DataTypes.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            },
            updatedAt: {
                type: DataTypes.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            }
        });

        // Composite Primary Key logic can be handled by unique index in Sequelize or constraint
        await queryInterface.addConstraint('quan_ly_nguoi_dung_chi_nhanh', {
            fields: ['id_nguoi_dung', 'id_chi_nhanh'],
            type: 'primary key',
            name: 'pk_quan_ly_nguoi_dung_chi_nhanh'
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('quan_ly_nguoi_dung_chi_nhanh');
    }
};
