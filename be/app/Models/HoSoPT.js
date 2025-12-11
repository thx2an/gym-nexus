const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const NguoiDung = require('./NguoiDung');

const HoSoPT = sequelize.define('HoSoPT', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    id_nguoi_dung: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: true,
        references: {
            model: 'nguoi_dungs',
            key: 'id'
        }
    },
    chuyen_mon: {
        type: DataTypes.STRING(200),
        allowNull: true
    },
    gioi_thieu: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    kinh_nghiem_nam: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
}, {
    tableName: 'ho_so_pt',
    timestamps: false
});

// Associations
HoSoPT.belongsTo(NguoiDung, { foreignKey: 'id_nguoi_dung', as: 'nguoi_dung' });
NguoiDung.hasOne(HoSoPT, { foreignKey: 'id_nguoi_dung', as: 'ho_so_pt' });

module.exports = HoSoPT;
