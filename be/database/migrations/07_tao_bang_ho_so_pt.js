/**
 * MIGRATION: 07_tao_bang_ho_so_pt.js
 * Bảng: ho_so_pt (trainer_profiles)
 * Mục đích: Thông tin chi tiết của huấn luyện viên.
 */

const { Sequelize, DataTypes } = require('sequelize');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('ho_so_pt', {
            id: { // trainer_id
                type: DataTypes.BIGINT,
                primaryKey: true,
                autoIncrement: true
            },
            id_nguoi_dung: {
                type: DataTypes.BIGINT,
                allowNull: false,
                unique: true,
                references: {
                    model: 'nguoi_dungs',
                    key: 'id'
                },
                onDelete: 'CASCADE'
            },
            chuyen_mon: { // specialization
                type: DataTypes.STRING(200),
                allowNull: true
            },
            gioi_thieu: { // bio
                type: DataTypes.TEXT,
                allowNull: true
            },
            kinh_nghiem_nam: { // experience_years
                type: DataTypes.INTEGER,
                allowNull: true
            }
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('ho_so_pt');
    }
};
