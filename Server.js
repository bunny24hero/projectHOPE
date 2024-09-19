const express = require('express');
const path = require('path');

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
