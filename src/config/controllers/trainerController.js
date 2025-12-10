const { sql } = require('../db');

const getAllTrainers = async (req, res) => {
    try {
        const result = await sql.query`SELECT * FROM Trainers`;
        res.json(result.recordset);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const createTrainer = async (req, res) => {
    try {
        const { name, phone, specialty, salary } = req.body; 

        await sql.query`
            INSERT INTO Trainers (name, specialty, phone, salary) 
            VALUES (${name}, ${specialty}, ${phone}, ${salary})
        `;
        
        res.status(201).json({ message: 'Tạo Trainer thành công!' });
    } catch (err) {
        console.error(err); // Log lỗi ra terminal để dễ debug
        res.status(500).json({ error: err.message });
    }
};

module.exports = { getAllTrainers, createTrainer };