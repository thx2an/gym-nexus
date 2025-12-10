const { sql } = require('../db');

// Lấy danh sách tất cả gói tập
const getAllPackages = async (req, res) => {
    try {
        // Gọi bảng Membership_Packages mà nãy ông tạo
        const result = await sql.query`SELECT * FROM Membership_Packages`;
        res.json(result.recordset);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { getAllPackages };