var express = require('express');
var router = express.Router();
const db = require('../db.js');

router.get('/like/:id', (req, res, next) => {
    res.send("Liked");
});

router.get('/dislike/:id', (req, res, next) => {
    res.send("Disliked");
});

module.exports = router;