const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const BuoiTap = require('./BuoiTap');
const NguoiDung = require('./NguoiDung');

const GhiChuBuoiTap = sequelize.define('GhiChuBuoiTap', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    id_buoi_tap: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    id_pt: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    id_thanh_vien: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    ghi_chu: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    chi_so_json: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    tableName: 'ghi_chu_buoi_tap',
    timestamps: true,
    createdAt: 'ngay_tao',
    updatedAt: false
});

GhiChuBuoiTap.belongsTo(BuoiTap, { foreignKey: 'id_buoi_tap', as: 'buoi_tap' });
GhiChuBuoiTap.belongsTo(NguoiDung, { foreignKey: 'id_thanh_vien', as: 'thanh_vien' });

module.exports = GhiChuBuoiTap;
