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
        const { fullName, email, phoneNumber, specialization, experience, bio } = req.body;
        
        await sql.query`INSERT INTO Trainers (fullName, email, phoneNumber, specialization, experience, bio) 
                        VALUES (${fullName}, ${email}, ${phoneNumber}, ${specialization}, ${experience}, ${bio})`;
        
        res.status(201).json({ message: 'Tạo Trainer thành công!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { getAllTrainers, createTrainer };