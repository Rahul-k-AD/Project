// controllers/authController.js
const jwt = require('jsonwebtoken');
const db = require('../config/db');
require('dotenv').config();

const adminLogin = async (req, res) => {
    const { username, password } = req.body;
    try {
        const [rows] = await db.query(
            'SELECT * FROM admin WHERE Username = ? AND Password = ?',
            [username, password]
        );

        if (rows.length === 0 || rows[0].Password.trim() !== password.trim()) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const admin = rows[0];
        const token = jwt.sign({ role: 'admin', id: admin.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token });
    } catch (error) {
        console.error('Login error:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { adminLogin };
