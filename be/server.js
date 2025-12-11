const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
// Import database config (New Structure)
const db = require('./app/Models');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database Connection Test
db.sequelize.authenticate()
    .then(() => {
        console.log('Database connected successfully (Method: Sequelize/MSSQL).');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

// Routes (Placeholder for now, as we migrate Controllers)
app.use('/api', require('./routes/api'));

app.get('/', (req, res) => {
    res.send('GymNexus Backend is running with New Structure (Models/Migrations).');
});

// Example Route to test Models
app.get('/api/test-users', async (req, res) => {
    try {
        const users = await db.NguoiDung.findAll({ limit: 5 });
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
