const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const ThanhToan = require('./ThanhToan');
const NguoiDung = require('./NguoiDung');

const YeuCauHoanTien = sequelize.define('YeuCauHoanTien', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    id_thanh_toan: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    id_thanh_vien: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    ly_do: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    trang_thai: {
        type: DataTypes.ENUM('pending', 'approved', 'rejected', 'processed'),
        allowNull: false
    },
    ngay_yeu_cau: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    nguoi_xu_ly: {
        type: DataTypes.BIGINT,
        allowNull: true
    },
    ngay_xu_ly: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    tableName: 'yeu_cau_hoan_tien',
    timestamps: false
});

YeuCauHoanTien.belongsTo(ThanhToan, { foreignKey: 'id_thanh_toan', as: 'thanh_toan' });
YeuCauHoanTien.belongsTo(NguoiDung, { foreignKey: 'id_thanh_vien', as: 'thanh_vien' });

module.exports = YeuCauHoanTien;
