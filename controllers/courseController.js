const db = require('../config/db');

const createCourse = async (req, res) => {
    const { course_name, course_code } = req.body;

    if (!course_name || !course_code) {
        return res.status(400).json({ error: 'Missing course_name or course_code' });
    }

    try {
        const [result] = await db.query(
            'INSERT INTO available_courses ( course_code, course_name) VALUES (?, ?)',
            [course_code, course_name]
        );

        res.status(201).json({ message: 'Course created', id: result.insertId });
    } catch (error) {
        console.error('DB Error:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    createCourse
};