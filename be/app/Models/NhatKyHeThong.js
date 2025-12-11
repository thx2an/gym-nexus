const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const NguoiDung = require('./NguoiDung');

const NhatKyHeThong = sequelize.define('NhatKyHeThong', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    doi_tuong: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    id_doi_tuong: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    hanh_dong: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    nguoi_thuc_hien: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    thoi_gian: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    chi_tiet: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    tableName: 'nhat_ky_he_thong',
    timestamps: false
});

NhatKyHeThong.belongsTo(NguoiDung, { foreignKey: 'nguoi_thuc_hien', as: 'nguoi_dung' });

module.exports = NhatKyHeThong;
