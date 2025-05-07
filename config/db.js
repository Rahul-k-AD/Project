const mysql = require('mysql2/promise');
const dotenv = require('dotenv'); // importing mysql and calling .env data

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
});

module.exports = pool; // exporting the connection to be used in other files
// This code is used to connect to a MySQL database using the mysql2 library in Node.js. It reads the database configuration from environment variables defined in a .env file. The connection is established and logged to the console, and the connection object is exported for use in other parts of the application.
