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

const assignCourseToStudent = async (req, res) => {
    const { student_id, course_code, subject_code, semester, type } = req.body;

    if (!student_id || !course_code || !subject_code || !semester) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        // You could validate the course_code or student_id here if needed

        const [result] = await db.query(
            `INSERT INTO courses_assigned 
             (student_id, course_code, subject_code, semester, type)
             VALUES (?, ?, ?, ?, ?)`,
            [student_id, course_code, subject_code, semester, type || 'regular']
        );

        res.status(201).json({ message: 'Course assigned', id: result.insertId });
    } catch (error) {
        console.error('DB Error:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    createCourse,
    assignCourseToStudent
};

module.exports = {
    createCourse,
    assignCourseToStudent
};