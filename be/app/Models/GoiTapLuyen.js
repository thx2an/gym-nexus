const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const GoiTapLuyen = sequelize.define('GoiTapLuyen', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    ma_goi: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    ten_goi: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    mo_ta: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    thoi_han_ngay: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    gia: {
        type: DataTypes.DECIMAL(18, 2),
        allowNull: false
    },
    quyen_loi: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    dang_hoat_dong: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    tableName: 'goi_tap_luyens',
    timestamps: false // No timestamps in migration 05? Wait, let's check.
    // Migration 05 had no timestamps column explicit in code, oh wait... I missed it in migration 05 code in Step 111?
    // Step 111 code: createTable... fields... no timestamps(). Just dang_hoat_dong.
    // So timestamps: false is correct based on migration.
});

module.exports = GoiTapLuyen;
