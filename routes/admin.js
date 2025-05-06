const verifyToken = require('../middlewares/verifyToken')
const express = require('express'); // importing express library
const router = express.Router(); // creating a router object to handle routes

router.get('/home', verifyToken, (req, res) => { // creating a test route to check if the server is running and if the token is valid

    res.json({ message: `Welcome, Admin with ID ${req.user.id}` }); // returning a welcome message if the token is valid
});

module.exports = router; // exporting the router to be used in other files
