/**
 * MIGRATION: 23_tao_bang_tin_nhan_ho_tro.js
 * Bảng: tin_nhan_ho_tro (ticket_messages)
 * Mục đích: Nội dung trao đổi trong ticket.
 */

const { Sequelize, DataTypes } = require('sequelize');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('tin_nhan_ho_tro', {
            id: {
                type: DataTypes.BIGINT,
                primaryKey: true,
                autoIncrement: true
            },
            id_phieu: { // ticket_id
                type: DataTypes.BIGINT,
                allowNull: false,
                references: {
                    model: 'phieu_ho_tro',
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
            vai_tro_nguoi_gui: { // sender_role (冗 dư nhưng tiện query)
                type: DataTypes.STRING(50),
                allowNull: true
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
        await queryInterface.dropTable('tin_nhan_ho_tro');
    }
};
