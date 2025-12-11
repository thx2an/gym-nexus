/**
 * MIGRATION: 27_tao_bang_bao_cao.js
 * Bảng: bao_cao (reports)
 * Mục đích: Lưu trữ báo cáo hệ thống đã xuất.
 */

const { Sequelize, DataTypes } = require('sequelize');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('bao_cao', {
            id: {
                type: DataTypes.BIGINT,
                primaryKey: true,
                autoIncrement: true
            },
            loai_bao_cao: { // type
                type: DataTypes.STRING(100),
                allowNull: true
            },
            tham_so_json: { // parameters_json
                type: DataTypes.TEXT,
                allowNull: true
            },
            nguoi_tao: {
                type: DataTypes.BIGINT,
                allowNull: false,
                references: {
                    model: 'nguoi_dungs',
                    key: 'id'
                }
            },
            ngay_tao: {
                type: DataTypes.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            },
            duong_dan_file: {
                type: DataTypes.STRING(255),
                allowNull: true
            }
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('bao_cao');
    }
};
