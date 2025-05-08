const express = require('express');
const router = express.Router();
const { createCourse } = require('../controllers/courseController');
const verifyToken = require('../middlewares/verifyToken');
const checkRole = require('../middlewares/checkRole');

// Only admins can access this route
router.post('/create-course', verifyToken, checkRole('admin'), createCourse);


module.exports = router;