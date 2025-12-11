const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const NguoiDung = require('./NguoiDung');

const ThanhToan = sequelize.define('ThanhToan', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    id_thanh_vien: {
        type: DataTypes.BIGINT,
        allowNull: true
    },
    so_tien: {
        type: DataTypes.DECIMAL(18, 2),
        allowNull: false
    },
    loai_tien: {
        type: DataTypes.STRING(10),
        allowNull: false
    },
    trang_thai: {
        type: DataTypes.ENUM('pending', 'success', 'failed', 'refunded'),
        allowNull: false
    },
    phuong_thuc: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    cong_thanh_toan: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    ma_giao_dich_cong: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    id_the_thanh_vien: {
        type: DataTypes.BIGINT,
        allowNull: true
    },
    id_buoi_tap: {
        type: DataTypes.BIGINT,
        allowNull: true
    }
}, {
    tableName: 'thanh_toan',
    timestamps: true,
    createdAt: 'ngay_tao',
    updatedAt: false
});

ThanhToan.belongsTo(NguoiDung, { foreignKey: 'id_thanh_vien', as: 'nguoi_dung' });

module.exports = ThanhToan;
