const express = require('express');
const mongoose =  require('mongoose');
const path = require('path');
const bcrypt  = require('bcrypt');


app = express();
//database connection
mongoose.connect('mongodb://127.0.0.1:27017/hope')
.then(() => console.log('Connected to MongoDB...'))
.catch(err => console.error('Could not connect to MongoDB...'));

const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,     
    } , 
    password: {
        type: String,
    }
});

const User  = mongoose.model('user', userSchema);




// middlewares
app.use(express.json())
app.use(express.urlencoded({extended: true}))


// Serve static files for login and home pages
app.get('/LoginSignUp', (req, res) => {
    res.sendFile(path.join(__dirname, 'ViewPages', 'login.html'));
});

app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'ViewPages', 'index.html'));
});



// post routes
app.post('/api/students', async (req, res) => {
    try {
        const email = req.body.email ;
        console.log(email)
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            console.log("User already exists");
            return res.send("user exist")
        }
        const user = new User(req.body);
        await user.save();
        console.log(user);
        // res.status(201).json({message : "succesfully created user"});
        res.redirect("/home")
    } catch (error) {
        res.status(400).send(error);
    }
});

app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Find the user by email
      const user = await users.findOne({ email });
  
      if (!user) {
        return res.status(401).send({ message: 'Invalid email or password' });
      }
  
      // Compare the provided password with the hashed password
      const isValidPassword = await bcrypt.compare(password, user.password);
  
      if (!isValidPassword) {
        return res.status(401).send({ message: 'Invalid email or password' });
      }
  
      // If the password is valid, return a success response
      res.send({ message: 'Login successful', user });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Internal Server Error' });
    }
    });

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
