// controllers/adminController.js
const db = require('../config/db');
const router = require('express').Router();

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


const addStudent = async (req, res) => {
    const { username, password, full_name, course_id } = req.body;

    if (!username || !password || !full_name || !course_id) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const [result] = await db.query(
            `INSERT INTO students (Username, Password, full_name, course_id)
             VALUES (?, ?, ?, ?)`,
            [username, password, full_name, course_id]
        );

        res.status(201).json({ message: 'Student created', id: result.insertId });
    } catch (error) {
        console.error('Error adding student:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};
const updateStudent = async (req, res) => {
    const { id } = req.params;
    const { full_name, username, password, course_id } = req.body;

    try {
        const [result] = await db.query(
            'UPDATE students SET full_name = ?, Username = ?, Password = ?, course_id = ? WHERE id = ?',
            [full_name, username, password, course_id, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Student not found' });
        }

        res.json({ message: 'Student updated successfully' });
    } catch (error) {
        console.error('Update Student Error:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const deleteStudent = async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await db.query(
            'DELETE FROM students WHERE id = ?',
            [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Student not found' });
        }

        res.json({ message: 'Student deleted successfully' });
    } catch (error) {
        console.error('Delete Student Error:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const addFaculty = async (req, res) => {
    const { faculty_name, username, password, subject_name, course_id } = req.body;

    if (!faculty_name || !username || !password || !subject_name || !course_id) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const [result] = await db.query(
            `INSERT INTO faculty_assigned (faculty_name, username, password, subject_name, course_id)
             VALUES (?, ?, ?, ?, ?)`,
            [faculty_name, username, password, subject_name, course_id]
        );

        res.status(201).json({ message: 'Faculty created', id: result.insertId });
    } catch (error) {
        console.error('Error adding faculty:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const updateFaculty = async (req, res) => {
    const { id } = req.params;
    const { faculty_name, username, password, subject_name, course_id } = req.body;

    try {
        const [result] = await db.query(
            'UPDATE faculty_assigned SET faculty_name = ?, username = ?, password = ?, subject_name = ?, course_id = ? WHERE id = ?',
            [faculty_name, username, password, subject_name, course_id, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Faculty not found' });
        }

        res.json({ message: 'Faculty updated successfully' });
    } catch (error) {
        console.error('Update Faculty Error:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const deleteFaculty = async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await db.query(
            'DELETE FROM faculty_assigned WHERE id = ?',
            [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Faculty not found' });
        }

        res.json({ message: 'Faculty deleted successfully' });
    } catch (error) {
        console.error('Delete Faculty Error:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};





// Home route for admin
const getHome = (req, res) => {
    res.json({ message: `Welcome, Admin with ID ${req.user.id}` });
};

module.exports = { assignSubject, getHome, addStudent, addFaculty, updateStudent, deleteStudent, updateFaculty, deleteFaculty };
