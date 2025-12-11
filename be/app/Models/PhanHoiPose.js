const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const PhienTapPose = require('./PhienTapPose');

const PhanHoiPose = sequelize.define('PhanHoiPose', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    id_phien_tap: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    thoi_diem: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    loai_phan_hoi: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    noi_dung: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    tableName: 'phan_hoi_pose',
    timestamps: false
});

PhanHoiPose.belongsTo(PhienTapPose, { foreignKey: 'id_phien_tap', as: 'phien_tap' });

module.exports = PhanHoiPose;
