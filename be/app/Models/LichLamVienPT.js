const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const HoSoPT = require('./HoSoPT');
const ChiNhanh = require('./ChiNhanh');

const LichLamVienPT = sequelize.define('LichLamVienPT', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    id_pt: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    id_chi_nhanh: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    ngay: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    gio_bat_dau: {
        type: DataTypes.TIME,
        allowNull: false
    },
    gio_ket_thuc: {
        type: DataTypes.TIME,
        allowNull: false
    },
    lap_lai_hang_tuan: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    thu_trong_tuan: {
        type: DataTypes.TINYINT,
        allowNull: true
    },
    da_khoa: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    tableName: 'lich_lam_viec_pt',
    timestamps: false
});

LichLamVienPT.belongsTo(HoSoPT, { foreignKey: 'id_pt', as: 'pt' });
LichLamVienPT.belongsTo(ChiNhanh, { foreignKey: 'id_chi_nhanh', as: 'chi_nhanh' });

module.exports = LichLamVienPT;
