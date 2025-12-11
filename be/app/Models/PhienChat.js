const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const NguoiDung = require('./NguoiDung');

const PhienChat = sequelize.define('PhienChat', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    id_thanh_vien: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    id_nhan_vien: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    trang_thai: {
        type: DataTypes.ENUM('open', 'closed', 'member_left'),
        allowNull: false
    },
    thoi_gian_bat_dau: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    thoi_gian_ket_thuc: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    tableName: 'phien_chat',
    timestamps: false
});

PhienChat.belongsTo(NguoiDung, { foreignKey: 'id_thanh_vien', as: 'thanh_vien' });
PhienChat.belongsTo(NguoiDung, { foreignKey: 'id_nhan_vien', as: 'nhan_vien' });

module.exports = PhienChat;
