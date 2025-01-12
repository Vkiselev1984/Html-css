const express = require('express'); // Import the express framework
const bodyParser = require('body-parser'); // Import body-parser to parse incoming request bodies
const path = require('path'); // Import path module for handling file paths
const fs = require('fs'); // Import file system module for file operations
const app = express(); // Create an instance of an Express application
const port = 5500; // Define the port number for the server
const cors = require('cors'); // Import CORS middleware for handling cross-origin requests

app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json()); // Parse JSON bodies for incoming requests
app.use(express.static(path.join(__dirname))); // Serve static files from the current directory

// Route to serve the main HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html')); // Send index.html file as a response
});

const bcrypt = require('bcrypt'); // Import bcrypt for password hashing

// Route to handle user registration
app.post('/register', (req, res) => {
    const { firstName, lastName, gender, email, password } = req.body; // Destructure user data from request body

    // Check if all required fields are provided
    if (!firstName || !lastName || !gender || !email || !password) {
        return res.status(400).send('All fields are required.'); // Send error response if fields are missing
    }

    // Hash the password using bcrypt
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            return res.status(500).send('Error hashing password.'); // Send error response if hashing fails
        }

        // Prepare user data to be saved in CSV format
        const userData = `${firstName},${lastName},${gender},${email},${hashedPassword}\n`;

        // Append user data to users.csv file
        fs.appendFile('users.csv', userData, (err) => {
            if (err) {
                return res.status(500).send('Error writing to file.'); // Send error response if writing fails
            }
            res.status(200).send('User registered successfully.'); // Send success response
        });
    });
});

// Route to handle user login
app.post('/login', (req, res) => {
    const { email, password } = req.body; // Destructure email and password from request body

    console.log(`Attempting to log in with email: ${email}`); // Log the login attempt

    // Read the users.csv file to find the user
    fs.readFile('users.csv', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Internal Server Error'); // Send error response if reading fails
        }

        const users = parseCSV(data); // Parse the CSV data to get user information
        const user = users.find(user => user.email === email); // Find the user by email

        if (user) {
            console.log('User found:', user); // Log the found user
            // Compare the provided password with the hashed password
            bcrypt.compare(password, user.password, (err, result) => {
                if (err) {
                    console.error('Error comparing passwords:', err); // Log error if comparison fails
                    return res.status(500).send('Internal Server Error'); // Send error response
                }
                if (result) {
                    res.json(user); // Successful authentication, send user data
                } else {
                    console.log('Password does not match'); // Log if passwords do not match
                    res.status(401).send('Invalid email or password'); // Send error response for invalid credentials
                }
            });
        } else {
            console.log('User not found'); // Log if user is not found
            res.status(401).send('Invalid email or password'); // Send error response for invalid credentials
        }
    });
});

// Function to parse CSV data and return an array of users
function parseCSV(data) {
    const lines = data.split('\n'); // Split data into lines
    const users = []; // Initialize an array to hold user objects

    for (let line of lines) {
        line = line.trim(); // Trim whitespace from the line
        if (line.length === 0) continue; // Skip empty lines

        const fields = line.split(','); // Split the line into fields
        if (fields.length >= 5) { // Ensure there are enough fields
            const name = fields[0].trim(); // Get the user's name
            const email = fields[3].trim(); // Get the user's email
            const password = fields[4].trim(); // Get the user's hashed password
            users.push({ name, email, password }); // Add user object to the array
        }
    }
    return users; // Return the array of users
}

// Start the server and listen on the specified port
app.listen(port, () => {
    console.log(`Server is running at http://127.0.0.1:${port}`); // Log the server URL
});