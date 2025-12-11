const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const ThanhToan = require('./ThanhToan');

const HoaDon = sequelize.define('HoaDon', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    id_thanh_toan: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    ma_hoa_don: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    ngay_xuat: {
        type: DataTypes.DATE,
        allowNull: false
    },
    tong_tien: {
        type: DataTypes.DECIMAL(18, 2),
        allowNull: false
    },
    duong_dan_file: {
        type: DataTypes.STRING(255),
        allowNull: true
    }
}, {
    tableName: 'hoa_don',
    timestamps: false
});

HoaDon.belongsTo(ThanhToan, { foreignKey: 'id_thanh_toan', as: 'thanh_toan' });

module.exports = HoaDon;
