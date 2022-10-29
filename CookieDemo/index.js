const express = require('express');
const app = express();
const cookie = require('cookie-parser');
const cookieParser = require('cookie-parser');

app.use(cookieParser());

app.get('/greet', (req, res) => {
    const { name = 'No-name' } = req.cookies;
    res.send(`HEY THERE, ${name}!`);
});

app.get('/setname', (req, res) => {
    res.cookie('name', 'henrietta');
    res.cookie('animal', 'harlequin shrimp');
    res.send('OK, SENT YOU A COOKIE!!!!')
});

app.listen(3000, () => {
    console.log('Serving app on localhost:3000');
})