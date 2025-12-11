/**
 * MIGRATION: 25_tao_bang_tin_nhan_chat.js
 * Bảng: tin_nhan_chat (chat_messages)
 * Mục đích: Nội dung chat.
 */

const { Sequelize, DataTypes } = require('sequelize');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('tin_nhan_chat', {
            id: {
                type: DataTypes.BIGINT,
                primaryKey: true,
                autoIncrement: true
            },
            id_phien_chat: {
                type: DataTypes.BIGINT,
                allowNull: false,
                references: {
                    model: 'phien_chat',
                    key: 'id'
                },
                onDelete: 'CASCADE'
            },
            id_nguoi_gui: {
                type: DataTypes.BIGINT,
                allowNull: false,
                references: {
                    model: 'nguoi_dungs',
                    key: 'id'
                }
            },
            vai_tro_nguoi_gui: {
                type: DataTypes.STRING(50),
                allowNull: false
            },
            noi_dung: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            ngay_tao: {
                type: DataTypes.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            }
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('tin_nhan_chat');
    }
};
