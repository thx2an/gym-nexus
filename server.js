const express = require('express');
const cors = require('cors');
const { connectDB } = require('./src/config/db');
const trainerRoutes = require('./src/config/routes/trainerRoutes');require('dotenv').config();

const app = express();

// Middleware cấu hình
app.use(express.json());
app.use(cors());

// Kết nối Database
connectDB();
app.use('/api/trainers', trainerRoutes);

// Route kiểm tra
app.get('/', (req, res) => {
    res.send('Gym Nexus Backend (Node.js) is running...');
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
});