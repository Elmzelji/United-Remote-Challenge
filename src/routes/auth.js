var express = require('express');
var router = express.Router();


// /Auth returen to Home/
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Shop Directory - Home Page' });
});

//Login Routes
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Shop Directory - LOGIN' });
});


//Signup Routes
router.get('/signup', function(req, res, next) {
    res.render('signup', { title: 'Shop Directory - SIGNUP' });
});

module.exports = router;