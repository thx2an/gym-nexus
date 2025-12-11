const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const NguoiDung = require('./NguoiDung');

const KeHoachDinhDuongAI = sequelize.define('KeHoachDinhDuongAI', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    id_thanh_vien: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    calo_hang_ngay: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    macro_json: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    ke_hoach_json: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    nguoi_tao: {
        type: DataTypes.BIGINT,
        allowNull: true
    }
}, {
    tableName: 'ke_hoach_dinh_duong_ai',
    timestamps: true,
    createdAt: 'ngay_tao',
    updatedAt: false
});

KeHoachDinhDuongAI.belongsTo(NguoiDung, { foreignKey: 'id_thanh_vien', as: 'thanh_vien' });

module.exports = KeHoachDinhDuongAI;
