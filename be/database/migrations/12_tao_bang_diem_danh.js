/**
 * MIGRATION: 12_tao_bang_diem_danh.js
 * Bảng: diem_danh (checkins)
 * Mục đích: Lưu lịch sử check-in vào phòng tập hoặc buổi tập.
 */

const { Sequelize, DataTypes } = require('sequelize');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('diem_danh', {
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
            thoi_gian_quyet: { // scanned_at
                type: DataTypes.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            },
            hop_le: { // is_valid
                type: DataTypes.BOOLEAN,
                allowNull: true
            }
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('diem_danh');
    }
};
