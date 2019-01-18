const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');

const users = require('./api/users');
const games = require('./api/games');
const runs = require('./api/runs');

 app.get('/', (req, res) => {
     res.statusCode = 200;
     res.contentType('text/html');
     res.send('hello world!');
 });

 app.get('/leaderboards', (req, res) => {
    fs.readFile('./leaderboards.html', (err, data) => {
        if (err) throw err;
        res.statusCode = 200;
        res.contentType('text/html');
        res.send(data);
        res.end();
    });
 });

 app.use('/api/users', users);
 app.use('/api/games', games);
 app.use('/api/runs', runs);

 app.listen(port, () => console.log(`Listening on port ${port}`));
