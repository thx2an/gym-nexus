/**
 * MIGRATION: 15_tao_bang_yeu_cau_hoan_tien.js
 * Bảng: yeu_cau_hoan_tien (refund_requests)
 * Mục đích: Quản lý yêu cầu hoàn tiền.
 */

const { Sequelize, DataTypes } = require('sequelize');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('yeu_cau_hoan_tien', {
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
            id_thanh_vien: {
                type: DataTypes.BIGINT,
                allowNull: false,
                references: {
                    model: 'nguoi_dungs',
                    key: 'id'
                }
            },
            ly_do: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            trang_thai: {
                type: DataTypes.ENUM('pending', 'approved', 'rejected', 'processed'),
                allowNull: false
            },
            ngay_yeu_cau: {
                type: DataTypes.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            },
            nguoi_xu_ly: {
                type: DataTypes.BIGINT,
                allowNull: true,
                references: {
                    model: 'nguoi_dungs',
                    key: 'id'
                }
            },
            ngay_xu_ly: {
                type: DataTypes.DATE,
                allowNull: true
            }
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('yeu_cau_hoan_tien');
    }
};
