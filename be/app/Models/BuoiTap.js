const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const NguoiDung = require('./NguoiDung');
const HoSoPT = require('./HoSoPT');
const ChiNhanh = require('./ChiNhanh');

const BuoiTap = sequelize.define('BuoiTap', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    id_thanh_vien: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    id_pt: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    id_chi_nhanh: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    thoi_gian_bat_dau: {
        type: DataTypes.DATE,
        allowNull: false
    },
    thoi_gian_ket_thuc: {
        type: DataTypes.DATE,
        allowNull: false
    },
    trang_thai: {
        type: DataTypes.ENUM('pending', 'confirmed', 'canceled', 'completed'),
        allowNull: false
    },
    ghi_chu: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    tableName: 'buoi_taps',
    timestamps: true,
    createdAt: 'ngay_tao',
    updatedAt: false
});

// Associations
BuoiTap.belongsTo(NguoiDung, { foreignKey: 'id_thanh_vien', as: 'thanh_vien' });
BuoiTap.belongsTo(HoSoPT, { foreignKey: 'id_pt', as: 'pt' });
BuoiTap.belongsTo(ChiNhanh, { foreignKey: 'id_chi_nhanh', as: 'chi_nhanh' });

module.exports = BuoiTap;
