const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const NguoiDung = require('./NguoiDung');

const PhieuHoTro = sequelize.define('PhieuHoTro', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    id_nguoi_gui: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    tieu_de: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    danh_muc: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    trang_thai: {
        type: DataTypes.ENUM('open', 'in_progress', 'waiting', 'resolved', 'closed'),
        allowNull: false
    },
    muc_do: {
        type: DataTypes.ENUM('low', 'medium', 'high'),
        allowNull: true
    },
    nguoi_xu_ly: {
        type: DataTypes.BIGINT,
        allowNull: true
    }
}, {
    tableName: 'phieu_ho_tro',
    timestamps: true,
    createdAt: 'ngay_tao',
    updatedAt: 'ngay_cap_nhat'
});

PhieuHoTro.belongsTo(NguoiDung, { foreignKey: 'id_nguoi_gui', as: 'nguoi_gui' });

module.exports = PhieuHoTro;
