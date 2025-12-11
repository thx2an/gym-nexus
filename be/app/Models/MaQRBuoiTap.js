const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const BuoiTap = require('./BuoiTap');

const MaQRBuoiTap = sequelize.define('MaQRBuoiTap', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    id_buoi_tap: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    token: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true
    },
    tao_luc: {
        type: DataTypes.DATE,
        allowNull: false
    },
    het_han_luc: {
        type: DataTypes.DATE,
        allowNull: false
    },
    da_su_dung: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    tableName: 'ma_qr_buoi_tap',
    timestamps: false
});

MaQRBuoiTap.belongsTo(BuoiTap, { foreignKey: 'id_buoi_tap', as: 'buoi_tap' });

module.exports = MaQRBuoiTap;
