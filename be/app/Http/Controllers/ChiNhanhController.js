const { ChiNhanh } = require('../../Models'); // Auto-loads from index.js

const ChiNhanhController = {
  // GET /api/admin/chi-nhanh/get-data
  getData: async (req, res) => {
    try {
      // Lấy tất cả dữ liệu (giống như lấy từ seeder)
      const data = await ChiNhanh.findAll();

      res.json({
        success: true,
        data: data
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  },

  // GET /api/chi-nhanh
  index: async (req, res) => {
    try {
      const data = await ChiNhanh.findAll();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  show: async (req, res) => { /* ... */ },
  store: async (req, res) => { /* ... */ },
  update: async (req, res) => { /* ... */ },
  destroy: async (req, res) => { /* ... */ }
};

module.exports = ChiNhanhController;
