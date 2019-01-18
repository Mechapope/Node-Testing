const express = require('express');
const router = express.Router();

const users = [
    {id: 1, username: "username 1", country: "CA", twitchName: "twitchymon", avatar: "test.png", dateCreated: "1547827035438"},
    {id: 2, username: "user2", country: "US", twitchName: "frankerz", avatar: "dog.jpg", dateCreated: "1547828035003"},
    {id: 3, username: "3user3", country: "DE", twitchName: "cursdcrown", avatar: "mark.png", dateCreated: "1547828035475"}
];

router.get('/', (req, res) => {
    res.statusCode = 200;
    res.send(users);
    res.end();
});

router.get('/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));

    if(user != undefined) {
        res.statusCode = 200;
        res.send(user);
    }
    else {
        res.statusCode = 404;
        res.send("not found");
    }

    res.end();
});

router.post('/', (req, res) => {
    //validation
    const newUser = {
        id: users.length + 1,
        username: req.body.username,
        country: req.body.country,
        twitchName: req.body.twitchName,
        avatar: req.body.avatar,
        dateCreated: Date.now()
    }
    res.statusCode = 200;
    res.send(newUser.id);
    res.end();
});

router.put('/:id', (req, res) => {

    let user = users.find(u => u.id === parseInt(req.params.id));

    if(user != undefined) {
        const updateUser = {
            id: req.query.id,
            username: req.body.username,
            country: req.body.country,
            twitchName: req.body.twitchName,
            avatar: req.body.avatar
        };

        users.splice(users.indexOf(user), 1, updateUser);

        res.statusCode = 200;
        res.send(updateUser);
    }
    else {
        res.statusCode = 404;
        res.send("not found");
    }    

    res.end();
});

router.delete('/:id', (req, res) => {
    let user = users.find(u => u.id === parseInt(req.params.id));

    if(user != undefined) {
        users.splice(users.indexOf(user), 1);

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