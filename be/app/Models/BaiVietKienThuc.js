const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const NguoiDung = require('./NguoiDung');

const BaiVietKienThuc = sequelize.define('BaiVietKienThuc', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    tieu_de: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    noi_dung: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    danh_muc: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    trang_thai: {
        type: DataTypes.ENUM('draft', 'published', 'archived'),
        allowNull: false
    },
    nguoi_tao: {
        type: DataTypes.BIGINT,
        allowNull: false
    }
}, {
    tableName: 'bai_viet_kien_thuc',
    timestamps: true,
    createdAt: 'ngay_tao',
    updatedAt: 'ngay_cap_nhat'
});

BaiVietKienThuc.belongsTo(NguoiDung, { foreignKey: 'nguoi_tao', as: 'tac_gia' });

module.exports = BaiVietKienThuc;
