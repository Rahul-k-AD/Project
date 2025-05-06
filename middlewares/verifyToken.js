const jwt = require('jsonwebtoken');
require('dotenv').config();

function verifyToken(req, res, next) {
    const authHeader = req.header('Authorization')
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) return res.status(401).json({ message: 'No token provided' }) // checking if token is provided in the request header


    jwt.verify(token, process.env.JWT_SECRET, (err, user) => { // verifying the token using jsonwebtoken library and the secret key from .env file
        if (err) {
            return res.status(403).json({ message: 'Invalid token' }) // checking if token is valid
        } // checking if token is valid
        // console.log(user) // logging the user data from the token
        req.user = user // setting the user in the request object
        next() // calling the next middleware or route handler
    })
}

module.exports = verifyToken // exporting the verifyToken middleware to be used in other files