const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const NguoiDung = require('./NguoiDung');

const BaoCao = sequelize.define('BaoCao', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    loai_bao_cao: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    tham_so_json: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    nguoi_tao: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    duong_dan_file: {
        type: DataTypes.STRING(255),
        allowNull: true
    }
}, {
    tableName: 'bao_cao',
    timestamps: true,
    createdAt: 'ngay_tao',
    updatedAt: false
});

BaoCao.belongsTo(NguoiDung, { foreignKey: 'nguoi_tao', as: 'nguoi_lap_bao_cao' });

module.exports = BaoCao;
