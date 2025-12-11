/**
 * MIGRATION: 02_tao_bang_nguoi_dungs.js
 * Bảng: nguoi_dungs (users)
 * Mục đích: Lưu trữ thông tin người dùng hệ thống.
 */

const { Sequelize, DataTypes } = require('sequelize');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('nguoi_dungs', {
            id: { // user_id
                type: DataTypes.BIGINT,
                primaryKey: true,
                autoIncrement: true
            },
            ho_ten: { // full_name
                type: DataTypes.STRING(150),
                allowNull: false
            },
            email: {
                type: DataTypes.STRING(150),
                allowNull: false,
                unique: true
            },
            so_dien_thoai: { // phone
                type: DataTypes.STRING(20),
                allowNull: false,
                unique: true
            },
            mat_khau: { // password_hash
                type: DataTypes.STRING(255),
                allowNull: false
            },
            gioi_tinh: { // gender
                type: DataTypes.STRING(20),
                allowNull: true
            },
            ngay_sinh: { // date_of_birth
                type: DataTypes.DATEONLY,
                allowNull: true
            },
            trang_thai: { // status
                type: DataTypes.ENUM('active', 'inactive', 'locked'),
                defaultValue: 'active'
            },
            anh_dai_dien: { // avatar (from HiTravel-1 suggestion, nice to have)
                type: DataTypes.STRING(255),
                allowNull: true
            },
            id_chuc_vu: { // FK to chuc_vus (Simulating Gym-Test's user_roles but simplified to 1-to-many as in HiTravel)
                type: DataTypes.INTEGER,
                allowNull: true, // Nullable initially or enforced? Let's keep nullable for flexibility or enforced if needed.
                references: {
                    model: 'chuc_vus',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL'
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

        await queryInterface.addIndex('nguoi_dungs', ['email']);
        await queryInterface.addIndex('nguoi_dungs', ['so_dien_thoai']);
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('nguoi_dungs');
    }
};
