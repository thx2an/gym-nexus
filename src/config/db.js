const sql = require('mssql');
require('dotenv').config();

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    options: {
        encrypt: false, 
        trustServerCertificate: true
    }
};

const connectDB = async () => {
    try {
        await sql.connect(config);
        console.log("✅ Đã kết nối SQL Server thành công!");
    } catch (err) {
        console.error("❌ Lỗi kết nối Database:", err);
    }
};

module.exports = { connectDB, sql };