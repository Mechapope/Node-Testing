const express = require('express');
const router = express.Router();

const runs = [
    {id: 1, userId: 1, gameId: 1, timeHours: 0, timeMinutes: 58, timeSeconds: 2, timeMilliseconds: 0, dateSubmitted: "1547827035438"},
    {id: 2, userId: 1, gameId: 1, timeHours: 1, timeMinutes: 02, timeSeconds: 10, timeMilliseconds: 0, dateSubmitted: "1547827039393"},
    {id: 3, userId: 1, gameId: 2, timeHours: 0, timeMinutes: 58, timeSeconds: 10, timeMilliseconds: 0, dateSubmitted: "1547827038748"},
    {id: 4, userId: 3, gameId: 1, timeHours: 1, timeMinutes: 10, timeSeconds: 0, timeMilliseconds: 0, dateSubmitted: "1547827037862"}
];

router.get('/', (req, res) => {
    res.statusCode = 200;
    res.send(runs);
    res.end();
});

router.get('/:id', (req, res) => {
    const run = runs.find(g => g.id === parseInt(req.params.id));

    if(run != undefined) {
        res.statusCode = 200;
        res.send(run);
    }
    else {
        res.statusCode = 404;
        res.send('not found');
    }
    
    res.end();
});

router.post('/', (req, res) => {
    //validation
    const newRun = {
        id: runs.length + 1,
        userId: req.body.params.userId,
        gameId: req.body.params.gameId,
        timeHours: parseInt(req.body.params.timeHours),
        timeMinutes: parseInt(req.body.params.timeMinutes),
        timeSeconds: parseInt(req.body.params.timeSeconds),
        timeMilliseconds: parseInt(req.body.params.timeMilliseconds),
        dateSubmitted: Date.now()
    };

    res.statusCode = 200;
    res.send(newRun.id);
    res.end();
});

router.put('/:id', (req, res) => {

    let run = runs.find(u => u.id === parseInt(req.params.id));

    if(run != undefined) {
        const updateRun = {
            id: req.query.id,
            userId: req.body.params.userId,
            gameId: req.body.params.gameId,
            timeHours: parseInt(req.body.params.timeHours),
            timeMinutes: parseInt(req.body.params.timeMinutes),
            timeSeconds: parseInt(req.body.params.timeSeconds),
            timeMilliseconds: parseInt(req.body.params.timeMilliseconds)
        };

        runs.splice(runs.indexOf(run), 1, updateRun);

        res.statusCode = 200;
        res.send(updateRun);
    }
    else {
        res.statusCode = 404;
        res.send("not found");
    }    

    res.end();
});

router.delete('/:id', (req, res) => {
    let run = runs.find(u => u.id === parseInt(req.params.id));

    if(run != undefined) {
        runs.splice(runs.indexOf(run), 1);

        res.statusCode = 200;
        res.send("deleted");
    }
    else {
        res.statusCode = 404;
        res.send("not found");
    }    

    res.end();
});

module.exports = router;