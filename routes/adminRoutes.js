const express = require('express');
const router = express.Router();
const { assignSubject, getHome } = require('../controllers/adminController');
const verifyToken = require('../middlewares/verifyToken');

// GET /api/admin/home - Protected route to test token
router.get('/home', verifyToken, getHome);

// POST /api/admin/assign-subject - Assign a subject to a student
router.post('/assign-subject', verifyToken, assignSubject);

module.exports = router;