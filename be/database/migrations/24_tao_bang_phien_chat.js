/**
 * MIGRATION: 24_tao_bang_phien_chat.js
 * Bảng: phien_chat (chat_sessions)
 * Mục đích: Quản lý phiên chat trực tiếp (Live Chat).
 */

const { Sequelize, DataTypes } = require('sequelize');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('phien_chat', {
            id: {
                type: DataTypes.BIGINT,
                primaryKey: true,
                autoIncrement: true
            },
            id_thanh_vien: {
                type: DataTypes.BIGINT,
                allowNull: false,
                references: {
                    model: 'nguoi_dungs',
                    key: 'id'
                }
            },
            id_nhan_vien: { // support_staff_id
                type: DataTypes.BIGINT,
                allowNull: false, // In real app might be null initially if waiting queue
                references: {
                    model: 'nguoi_dungs',
                    key: 'id'
                }
            },
            trang_thai: {
                type: DataTypes.ENUM('open', 'closed', 'member_left'),
                allowNull: false
            },
            thoi_gian_bat_dau: {
                type: DataTypes.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            },
            thoi_gian_ket_thuc: {
                type: DataTypes.DATE,
                allowNull: true
            }
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('phien_chat');
    }
};
