/**
 * MIGRATION: 28_tao_bang_nhat_ky_he_thong.js
 * Bảng: nhat_ky_he_thong (audit_logs)
 * Mục đích: Ghi log hành động quan trọng (Audit Trail).
 */

const { Sequelize, DataTypes } = require('sequelize');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('nhat_ky_he_thong', {
            id: {
                type: DataTypes.BIGINT,
                primaryKey: true,
                autoIncrement: true
            },
            doi_tuong: { // entity_type
                type: DataTypes.STRING(100),
                allowNull: true
            },
            id_doi_tuong: { // entity_id
                type: DataTypes.BIGINT,
                allowNull: false
            },
            hanh_dong: { // action
                type: DataTypes.STRING(100),
                allowNull: false
            },
            nguoi_thuc_hien: { // performed_by
                type: DataTypes.BIGINT,
                allowNull: false,
                references: {
                    model: 'nguoi_dungs',
                    key: 'id'
                }
            },
            thoi_gian: {
                type: DataTypes.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            },
            chi_tiet: {
                type: DataTypes.TEXT,
                allowNull: true
            }
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('nhat_ky_he_thong');
    }
};
