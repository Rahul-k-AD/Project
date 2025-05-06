const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
}