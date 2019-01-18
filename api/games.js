const express = require('express');
const router = express.Router();

const games = [
    {id: 1, name: "dark souls 1", shortName: "ds1", boxArt: "ds.png"},
    {id: 2, name: "harry potter nd da chamber of secrits", shortName: "hp2", boxArt: "podder.png"},
    {id: 3, name: "the room", shortName: "trt", boxArt: "tw.png"}
];

router.get('/', (req, res) => {
    res.statusCode = 200;
    res.send(games);
    res.end();
});

router.get('/:id', (req, res) => {
    const game = games.find(g => g.id === parseInt(req.params.id));

    if(game != undefined) {
        res.statusCode = 200;
        res.send(game);
    }
    else {
        res.statusCode = 404;
        res.send('not found');
    }
    
    res.end();
});

router.post('/', (req, res) => {
    //validation
    const newGame = {
        id: games.length + 1,
        name: "",
        shortName: "",
        boxArt: ""
    }
    res.statusCode = 200;
    res.send(newGame.id);
    res.end();
});

router.put('/:id', (req, res) => {

    let game = games.find(u => u.id === parseInt(req.params.id));

    if(game != undefined) {
        const updateGame = {
            id: req.query.id,
            name: req.body.name,
            shortName: req.body.shortName,
            boxArt: req.body.boxArt
        };

        games.splice(games.indexOf(game), 1, updateGame);

        res.statusCode = 200;
        res.send(updateGame);
    }
    else {
        res.statusCode = 404;
        res.send("not found");
    }    

    res.end();
});

router.delete('/:id', (req, res) => {
    let game = games.find(u => u.id === parseInt(req.params.id));

    if(game != undefined) {
        games.splice(games.indexOf(game), 1);

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