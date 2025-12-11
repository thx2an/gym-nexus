/**
 * MIGRATION: 26_tao_bang_bai_viet_kien_thuc.js
 * Bảng: bai_viet_kien_thuc (knowledge_base_articles)
 * Mục đích: Quản lý bài viết hướng dẫn/FAQ.
 */

const { Sequelize, DataTypes } = require('sequelize');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('bai_viet_kien_thuc', {
            id: {
                type: DataTypes.BIGINT,
                primaryKey: true,
                autoIncrement: true
            },
            tieu_de: {
                type: DataTypes.STRING(255),
                allowNull: false
            },
            noi_dung: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            danh_muc: {
                type: DataTypes.STRING(100),
                allowNull: true
            },
            trang_thai: {
                type: DataTypes.ENUM('draft', 'published', 'archived'),
                allowNull: false
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
            ngay_cap_nhat: {
                type: DataTypes.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            }
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('bai_viet_kien_thuc');
    }
};
