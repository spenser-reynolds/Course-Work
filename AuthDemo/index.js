const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const engine = require('ejs-mate');
const User = require('./models/user');
const app = express();
const bcrypt = require('bcrypt');
const user = require('./models/user');

mongoose.connect('mongodb://localhost:27017/authDemo', { 
})

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.send('This is the homepage');
});


app.get('/register', (req, res) => {
    res.render('register');
});


app.post('/register', async (req, res) => {
    const { password, username } = req.body;
    const hash = await bcrypt.hash(password, 12);
    const user = new User({
        username,
        password: hash
    })
    await user.save();
    res.redirect('/');
});


app.get('/login', (req, res) => {
    res.render('login');
});


app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const validPassword = await bcrypt.compare(password, user.password);
    if (validPassword){
        res.send('Yay, Welcome back!');
    } else {
        res.send('Try agian');
    };
});


app.get('/secret', (req, res) => {
    res.send('THIS IS SECRET! YOU CANNOT SEE ME UNLESS YOU ARE LOGGED IN!');
});


app.listen(3000, () => {
    console.log('Serving app on localhost:3000');
});