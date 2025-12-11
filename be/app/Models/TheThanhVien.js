const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const NguoiDung = require('./NguoiDung');
const GoiTapLuyen = require('./GoiTapLuyen');

const TheThanhVien = sequelize.define('TheThanhVien', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    id_nguoi_dung: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    id_goi_tap: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    ngay_bat_dau: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    ngay_ket_thuc: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    trang_thai: {
        type: DataTypes.ENUM('pending', 'active', 'expired', 'canceled'),
        defaultValue: 'pending'
    }
}, {
    tableName: 'the_thanh_viens',
    timestamps: true,
    createdAt: 'ngay_tao',
    updatedAt: 'ngay_cap_nhat'
});

// Associations
TheThanhVien.belongsTo(NguoiDung, { foreignKey: 'id_nguoi_dung', as: 'nguoi_dung' });
TheThanhVien.belongsTo(GoiTapLuyen, { foreignKey: 'id_goi_tap', as: 'goi_tap' });
NguoiDung.hasMany(TheThanhVien, { foreignKey: 'id_nguoi_dung', as: 'the_thanh_viens' });

module.exports = TheThanhVien;
