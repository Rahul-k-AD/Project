// const express = require('express');
// const router = express.Router(); // importing express and creating a router object
// const jwt = require('jsonwebtoken'); // importing jsonwebtoken library for token generation and verification
// const db = require('../config/db'); // importing the database connection


// router.post('/login', (req, res) => { // creating a post route for login
//     db.query(email, password) = req.body; // destructuring the request body to get email and password
//     if (!email || !password) { // checking if email and password are provided
//         return res.status(400).json({ message: 'Email and password are required' }); // returning error if not provided
//     } // checking if email and password are provided
//     const sql = 'SELECT * FROM users WHERE email = ? AND password = ?'; // sql query to check if user exists in the database
//     db.query(sql, [email, password], (err, results) => { // executing the sql query
//         if (err) { // checking for errors
//             console.error(err); // logging the error
//             return res.status(500).json({ message: 'Internal server error' }); // returning internal server error
//         } // checking for errors
//         if (results.length === 0) { // checking if user exists
//             return res.status(401).json({ message: 'Invalid email or password' }); // returning invalid email or password error
//         } // checking if user exists
//         const user = results[0]; // getting the user from the results
//         const token = jwt.sign({ id: user.id, emaill: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' }); // generating a token using jsonwebtoken library and signing it with the secret key from .env file and setting expiration time to 1 hour
//         res.json({ token }); // returning the token in the response
//     }); // executing the sql query
// });

// module.exports = router; // exporting the router to be used in other files

// admin test


const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const db = require('../config/db');
require('dotenv').config(); // importing the dotenv library to load environment variables from .env file

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    console.log('Received username:', username, 'and password:', password); // Log the input

    try {
        const [rows] = await db.query('SELECT * FROM admin WHERE Username = ? AND Password = ?', [username, password]);

        console.log('Query result:', rows); // Log the query result

        if (rows.length === 0) {
            console.log('No matching user found');
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const admin = rows[0];

        // Add extra logging to check what data is being compared
        console.log('Admin data:', admin);

        if (!password || !admin.Password) {
            console.log('Password or admin password is undefined');
            return res.status(400).json({ error: 'Password or admin password is undefined' });
        }

        console.log('Received password:', password);
        console.log('Stored password:', admin.Password);

        if (admin.Password.trim() !== password.trim()) {
            console.log('Password does not match');
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ role: 'admin', id: admin.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });

    } catch (error) {
        console.error('DB Error:', error.message); // Detailed error logging
        res.status(500).json({ error: 'Internal server error' });
    }
});
// issue i made here is admin.password make sure that admin table contains password the column with same name but i had Password which was a pascal case and returned in undefined error

module.exports = router; // exporting the router to be used in other files