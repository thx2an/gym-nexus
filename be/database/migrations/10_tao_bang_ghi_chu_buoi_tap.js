/**
 * MIGRATION: 10_tao_bang_ghi_chu_buoi_tap.js
 * Bảng: ghi_chu_buoi_tap (session_notes)
 * Mục đích: Ghi chép, đánh giá sau buổi tập.
 */

const { Sequelize, DataTypes } = require('sequelize');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('ghi_chu_buoi_tap', {
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
            id_pt: {
                type: DataTypes.BIGINT,
                allowNull: false,
                references: {
                    model: 'ho_so_pt',
                    key: 'id'
                }
            },
            id_thanh_vien: {
                type: DataTypes.BIGINT,
                allowNull: false,
                references: {
                    model: 'nguoi_dungs',
                    key: 'id'
                }
            },
            ghi_chu: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            chi_so_json: { // metrics_json
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
        await queryInterface.dropTable('ghi_chu_buoi_tap');
    }
};
