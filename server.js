const express = require('express');  // importing libraries
const cors = require('cors');
const bodyParser = require('body-parser');
const verifyToken = require('./middlewares/verifyToken'); // importing the verifyToken middleware
require('dotenv').config();


const app = express();
const port = process.env.PORT || 5000; // crating express app and setting port
const authRoutes = require('./routes/authRoutes'); // importing the auth routes
const adminRoutes = require('./routes/adminRoutes'); // importing the admin routes
// const facultyRoutes = require('./routes/facultyRoutes'); // importing the faculty routes
// const studentRoutes = require('./routes/studentRoutes'); // importing the student routes
const courseRoutes = require('./routes/courseRoutes'); // importing the course routes
// const lectureRoutes = require('./routes/lectureRoutes'); // importing the lecture routes



app.use(cors());  //allowing API access from different domains/ports (like frontend runs on localhost 3000) allowing it to call this api
app.use(bodyParser.json()); // making server understand json data
app.use('/api/auth', authRoutes); // using the auth routes in the express app
app.use('/api/admin', adminRoutes); // using the admin routes in the express app
// app.use('/api/faculty', facultyRoutes); // using the faculty routes in the express app
// app.use('/api/student', studentRoutes); // using the student routes in the express app

app.use('/api/courses', courseRoutes); // using the course routes in the express app
// app.use('/api/lectures', lectureRoutes); // using the lecture routes in the express app

app.get('/', (req, res) => {
    res.send('Engines are running!');
}); // creating a test route to check if the server is running

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}
); // starting the server and listening on the specified port


