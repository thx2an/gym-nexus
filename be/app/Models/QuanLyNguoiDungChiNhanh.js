const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const NguoiDung = require('./NguoiDung');
const ChiNhanh = require('./ChiNhanh');

const QuanLyNguoiDungChiNhanh = sequelize.define('QuanLyNguoiDungChiNhanh', {
    id_nguoi_dung: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'nguoi_dungs',
            key: 'id'
        }
    },
    id_chi_nhanh: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'chi_nhanhs',
            key: 'id'
        }
    },
    la_chi_nhanh_chinh: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    tableName: 'quan_ly_nguoi_dung_chi_nhanh',
    timestamps: true
});

NguoiDung.belongsToMany(ChiNhanh, { through: QuanLyNguoiDungChiNhanh, foreignKey: 'id_nguoi_dung' });
ChiNhanh.belongsToMany(NguoiDung, { through: QuanLyNguoiDungChiNhanh, foreignKey: 'id_chi_nhanh' });

module.exports = QuanLyNguoiDungChiNhanh;
