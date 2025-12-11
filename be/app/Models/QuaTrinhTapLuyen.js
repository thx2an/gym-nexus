const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const NguoiDung = require('./NguoiDung');

const QuaTrinhTapLuyen = sequelize.define('QuaTrinhTapLuyen', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    id_thanh_vien: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    ngay_ghi_nhan: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    loai_chi_so: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    gia_tri: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    don_vi: {
        type: DataTypes.STRING(20),
        allowNull: true
    },
    nguon: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    nguoi_tao: {
        type: DataTypes.BIGINT,
        allowNull: false
    }
}, {
    tableName: 'qua_trinh_tap_luyen',
    timestamps: true,
    createdAt: 'ngay_tao',
    updatedAt: false
});

QuaTrinhTapLuyen.belongsTo(NguoiDung, { foreignKey: 'id_thanh_vien', as: 'thanh_vien' });

module.exports = QuaTrinhTapLuyen;
