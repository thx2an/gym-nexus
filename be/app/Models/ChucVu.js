const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const ChucVu = sequelize.define('ChucVu', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    ma_chuc_vu: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    ten_chuc_vu: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    mo_ta: {
        type: DataTypes.STRING(255),
        allowNull: true
    }
}, {
    tableName: 'chuc_vus',
    timestamps: true,
    createdAt: 'ngay_tao',
    updatedAt: 'ngay_cap_nhat'
});

module.exports = ChucVu;
