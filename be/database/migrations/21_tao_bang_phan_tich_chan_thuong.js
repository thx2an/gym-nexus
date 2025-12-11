/**
 * MIGRATION: 21_tao_bang_phan_tich_chan_thuong.js
 * Bảng: phan_tich_chan_thuong (injury_risk_analyses)
 * Mục đích: Phân tích rủi ro chấn thương dựa trên tư thế.
 */

const { Sequelize, DataTypes } = require('sequelize');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('phan_tich_chan_thuong', {
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
            thoi_gian_phan_tich: {
                type: DataTypes.DATE,
                allowNull: false
            },
            muc_do_rui_ro: { // risk_level
                type: DataTypes.ENUM('low', 'medium', 'high'),
                allowNull: false
            },
            diem_so: { // score
                type: DataTypes.FLOAT,
                allowNull: true
            },
            yeu_to_anh_huong_json: { // factors_json
                type: DataTypes.TEXT,
                allowNull: true
            },
            khuyen_nghi: { // recommendations
                type: DataTypes.TEXT,
                allowNull: true
            }
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('phan_tich_chan_thuong');
    }
};
