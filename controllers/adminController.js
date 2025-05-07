// controllers/adminController.js
const db = require('../config/db');

// Assign subject to student
const assignSubject = async (req, res) => {
    const { student_id, course_code, subject_code, semester, type } = req.body;

    if (!student_id || !course_code || !subject_code || !semester) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        const [result] = await db.query(
            `INSERT INTO courses_assigned (student_id, course_code, subject_code, semester, type)
             VALUES (?, ?, ?, ?, ?)`,
            [student_id, course_code, subject_code, semester, type || 'regular']
        );

        res.status(201).json({ message: 'Subject assigned successfully', id: result.insertId });
    } catch (error) {
        console.error('DB Error:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Home route for admin
const getHome = (req, res) => {
    res.json({ message: `Welcome, Admin with ID ${req.user.id}` });
};

module.exports = { assignSubject, getHome };
