const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const ChucVu = require('./ChucVu');

const NguoiDung = sequelize.define('NguoiDung', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    ho_ten: {
        type: DataTypes.STRING(150),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(150),
        allowNull: false,
        unique: true
    },
    so_dien_thoai: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true
    },
    mat_khau: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    gioi_tinh: {
        type: DataTypes.STRING(20),
        allowNull: true
    },
    ngay_sinh: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    trang_thai: {
        type: DataTypes.ENUM('active', 'inactive', 'locked'),
        defaultValue: 'active'
    },
    anh_dai_dien: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    id_chuc_vu: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'chuc_vus',
            key: 'id'
        }
    }
}, {
    tableName: 'nguoi_dungs',
    timestamps: true,
    createdAt: 'ngay_tao',
    updatedAt: 'ngay_cap_nhat'
});

// Associations
NguoiDung.belongsTo(ChucVu, { foreignKey: 'id_chuc_vu', as: 'chuc_vu' });
ChucVu.hasMany(NguoiDung, { foreignKey: 'id_chuc_vu', as: 'nguoi_dungs' });

module.exports = NguoiDung;
