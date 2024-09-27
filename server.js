const express = require('express');
const studentRoutes = require('./routes/student.route');
const connectDB = require('./config/db.config'); // Ensure the path is correct
const Student = require('./models/student.model'); // Import the Student model

require('dotenv').config();

const app = express();
app.set('view engine', 'ejs'); // Set EJS as the view engine
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // To parse URL-encoded bodies

// Connect to the database
connectDB();

// Use student routes
app.use('/api/students', studentRoutes);

// Serve the main page
app.get('/', async (req, res) => {
    try {
        const students = await Student.find(); // Fetch all students
        res.render('index', { students });
    } catch (error) {
        console.error('Error fetching students:', error);
        res.status(500).send('Server Error');
    }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
