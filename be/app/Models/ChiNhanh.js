const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const ChiNhanh = sequelize.define('ChiNhanh', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    ten_chi_nhanh: {
        type: DataTypes.STRING(150),
        allowNull: false
    },
    dia_chi: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    so_dien_thoai: {
        type: DataTypes.STRING(20),
        allowNull: true
    },
    dang_hoat_dong: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    tableName: 'chi_nhanhs',
    timestamps: true,
    createdAt: 'ngay_tao',
    updatedAt: false // Schema had only ngay_tao in migration 03? No, let's check. 
    // Migration 03 had 'ngay_tao'. No updatedAt.
});

module.exports = ChiNhanh;
