const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const engine = require('ejs-mate');
const User = require('./models/user');
const app = express();
const bcrypt = require('bcrypt');
const session = require('express-session');

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

const sessionconfig = {
    secret: 'notagoodsecret',
    resave: false,
    saveUninitialized: true,
    cookie:{
        httpOnly: true,
    }
}

app.use(express.urlencoded({ extended: true }));
app.use(session(sessionconfig));


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
    req.session.user_id = user._id;
    res.redirect('/');
});


app.get('/login', (req, res) => {
    res.render('login');
});


app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const validPassword = await bcrypt.compare(password, user.password);
    if (validPassword) {
        req.session.user_id = user._id;
        res.redirect('/secret');
    } else {
        res.redirect('/login');
    };
});


app.get('/secret', (req, res) => {
    if (!req.session.user_id) {
        return res.redirect('/login');
    }
    res.render('secret');
});


app.post('/logout', async (req, res) => {
    req.session.user_id = null;
    res.redirect('/login');
});  


app.listen(3000, () => {
    console.log('Serving app on localhost:3000');
});