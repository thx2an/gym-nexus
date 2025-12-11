const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const NguoiDung = require('./NguoiDung');

const KeHoachTapAI = sequelize.define('KeHoachTapAI', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    id_thanh_vien: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    muc_tieu: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    thoi_gian_tuan: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    ke_hoach_json: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    nguon: {
        type: DataTypes.ENUM('ai', 'pt'),
        allowNull: false
    },
    nguoi_tao: {
        type: DataTypes.BIGINT,
        allowNull: true
    }
}, {
    tableName: 'ke_hoach_tap_ai',
    timestamps: true,
    createdAt: 'ngay_tao',
    updatedAt: false
});

KeHoachTapAI.belongsTo(NguoiDung, { foreignKey: 'id_thanh_vien', as: 'thanh_vien' });

module.exports = KeHoachTapAI;
