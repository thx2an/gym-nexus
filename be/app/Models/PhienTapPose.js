const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const NguoiDung = require('./NguoiDung');

const PhienTapPose = sequelize.define('PhienTapPose', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    id_thanh_vien: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    ten_bai_tap: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    thoi_gian_bat_dau: {
        type: DataTypes.DATE,
        allowNull: false
    },
    thoi_gian_ket_thuc: {
        type: DataTypes.DATE,
        allowNull: false
    },
    tong_ket_ket_qua: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    duong_dan_video: {
        type: DataTypes.STRING(255),
        allowNull: true
    }
}, {
    tableName: 'phien_tap_pose',
    timestamps: true,
    createdAt: 'ngay_tao',
    updatedAt: false
});

PhienTapPose.belongsTo(NguoiDung, { foreignKey: 'id_thanh_vien', as: 'thanh_vien' });

module.exports = PhienTapPose;
