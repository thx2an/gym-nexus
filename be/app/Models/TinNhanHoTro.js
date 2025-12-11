const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const PhieuHoTro = require('./PhieuHoTro');
const NguoiDung = require('./NguoiDung');

const TinNhanHoTro = sequelize.define('TinNhanHoTro', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    id_phieu: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    id_nguoi_gui: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    vai_tro_nguoi_gui: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    noi_dung: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    tableName: 'tin_nhan_ho_tro',
    timestamps: true,
    createdAt: 'ngay_tao',
    updatedAt: false
});

TinNhanHoTro.belongsTo(PhieuHoTro, { foreignKey: 'id_phieu', as: 'phieu' });
TinNhanHoTro.belongsTo(NguoiDung, { foreignKey: 'id_nguoi_gui', as: 'nguoi_gui_tin' });

module.exports = TinNhanHoTro;
