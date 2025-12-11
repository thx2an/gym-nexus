const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const PhienChat = require('./PhienChat');
const NguoiDung = require('./NguoiDung');

const TinNhanChat = sequelize.define('TinNhanChat', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    id_phien_chat: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    id_nguoi_gui: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    vai_tro_nguoi_gui: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    noi_dung: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    tableName: 'tin_nhan_chat',
    timestamps: true,
    createdAt: 'ngay_tao',
    updatedAt: false
});

TinNhanChat.belongsTo(PhienChat, { foreignKey: 'id_phien_chat', as: 'phien_chat' });
TinNhanChat.belongsTo(NguoiDung, { foreignKey: 'id_nguoi_gui', as: 'nguoi_gui' });

module.exports = TinNhanChat;
