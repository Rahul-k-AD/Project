const express = require('express');
const router = express.Router();
const { createCourse } = require('../controllers/courseController');
const { assignSubject, getHome } = require('../controllers/adminController');
const verifyToken = require('../middlewares/verifyToken');
const checkRole = require('../middlewares/checkRole'); // Middleware to check user role

// GET /api/admin/home - Protected route to test token
router.get('/home', verifyToken, getHome);

// POST /api/admin/assign-subject - Assign a subject to a student
router.post('/assign-subject', verifyToken, assignSubject);

router.post('/create-course', verifyToken, checkRole('admin'), createCourse);

module.exports = router;