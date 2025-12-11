const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const NguoiDung = require('./NguoiDung');

const PhanTichChanThuong = sequelize.define('PhanTichChanThuong', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    id_thanh_vien: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    thoi_gian_phan_tich: {
        type: DataTypes.DATE,
        allowNull: false
    },
    muc_do_rui_ro: {
        type: DataTypes.ENUM('low', 'medium', 'high'),
        allowNull: false
    },
    diem_so: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    yeu_to_anh_huong_json: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    khuyen_nghi: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    tableName: 'phan_tich_chan_thuong',
    timestamps: false
});

PhanTichChanThuong.belongsTo(NguoiDung, { foreignKey: 'id_thanh_vien', as: 'thanh_vien' });

module.exports = PhanTichChanThuong;
