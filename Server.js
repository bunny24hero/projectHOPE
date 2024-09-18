const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

const app = express();
app.use(bodyParser.json());

// Serve static files from the 'ViewPages' directory
app.use(express.static(path.join(__dirname, 'ViewPages')));

// Nodemailer setup for sending verification emails
let transporter = nodemailer.createTransport({
    service: 'Gmail', // You can change this to any other service (like Outlook)
    auth: {
        user: 'your-email@gmail.com', // Your email
        pass: 'your-email-password'   // Your email password or app password
    }
});

let tempCode = ''; // Temporary store for the verification code
let userEmail = ''; // Temporary store for the user's email

// Route to handle sign-up and send the verification code
app.post('/signup', (req, res) => {
    userEmail = req.body.email;

    // Generate a random verification code
    tempCode = crypto.randomBytes(3).toString('hex'); // 6-character code

    // Send verification email
    let mailOptions = {
        from: 'your-email@gmail.com',
        to: userEmail,
        subject: 'Email Verification Code',
        text: `Your verification code is ${tempCode}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send({ message: 'Error sending email' });
        }
        res.send({ message: 'Verification email sent!' });
    });
});

// Route to verify the code
app.post('/verify', (req, res) => {
    const { code } = req.body;
    if (code === tempCode) {
        res.send({ message: 'Verification successful' });
        // Proceed to store user data in the database
    } else {
        res.status(400).send({ message: 'Invalid verification code' });
    }
});

// Serve static files for login and home pages
app.get('/LoginSignUp', (req, res) => {
    res.sendFile(path.join(__dirname, 'ViewPages', 'login.html'));
});

app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'ViewPages', 'index.html'));
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
