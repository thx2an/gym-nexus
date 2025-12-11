const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const BuoiTap = require('./BuoiTap');
const NguoiDung = require('./NguoiDung');

const DiemDanh = sequelize.define('DiemDanh', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    id_buoi_tap: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    id_thanh_vien: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    thoi_gian_quyet: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    hop_le: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    }
}, {
    tableName: 'diem_danh',
    timestamps: false
});

DiemDanh.belongsTo(BuoiTap, { foreignKey: 'id_buoi_tap', as: 'buoi_tap' });
DiemDanh.belongsTo(NguoiDung, { foreignKey: 'id_thanh_vien', as: 'thanh_vien' });

module.exports = DiemDanh;
