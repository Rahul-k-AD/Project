const express = require('express');
const router = express.Router();
const {
    createCourse,
} = require('../controllers/courseController');

const {
    assignSubject,
    getHome,
    addStudent,
    updateStudent,
    deleteStudent,
    addFaculty,
    updateFaculty,
    deleteFaculty
} = require('../controllers/adminController');

const verifyToken = require('../middlewares/verifyToken');
const checkRole = require('../middlewares/checkRole'); // Middleware to check user role

// Test route for admin
router.get('/home', verifyToken, getHome);

// Course creation (admin only)
router.post('/create-course', verifyToken, checkRole('admin'), createCourse);

// Assign a subject to a student (admin only)
router.post('/assign-subject', verifyToken, checkRole('admin'), assignSubject);

// Student management routes (admin only)
router.post('/add-student', verifyToken, checkRole('admin'), addStudent);
router.put('/update-student/:id', verifyToken, checkRole('admin'), updateStudent);
router.delete('/delete-student/:id', verifyToken, checkRole('admin'), deleteStudent);

// Faculty management routes (admin only)
router.post('/add-faculty', verifyToken, checkRole('admin'), addFaculty);
router.put('/update-faculty/:id', verifyToken, checkRole('admin'), updateFaculty);
router.delete('/delete-faculty/:id', verifyToken, checkRole('admin'), deleteFaculty);

module.exports = router;
