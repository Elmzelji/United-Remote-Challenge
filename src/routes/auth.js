var express = require('express');
const bcrypt = require('bcrypt');

var router = express.Router();

const db = require('../db.js');

// /Auth returen to Home/
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Shop Directory - Home Page' });
});

//Login Routes
router.get('/login', function(req, res, next) {
  if(req.session.user)
    res.redirect('/');
  else
    res.render('login', { title: 'Shop Directory - LOGIN' });
    
});


router.post('/login', function(request, response) {
	var email = request.body.email;
	var password = request.body.password;
	if (email && password) {
		db.query('SELECT * FROM users WHERE email = ?', [email], function(error, results, fields) {
			if (results.length > 0) {

        bcrypt.compare(password, results[0].password, function(err, res) {
          if(res) {
            const user_id = results[0].id;
            request.session.user = user_id;
            response.redirect('/');
          } else {
            response.send("Oops that's not your password");
          } 
        });

			} else {
				response.send('There is no user with this mail');
			}			
		});
	} else {
		response.send('Please enter Username and Password!');
	}
});


//Signup Routes
router.get('/signup', function(req, res, next) {
  if(req.session.user)
    res.redirect('/');
  else
    res.render('signup', { title: 'Shop Directory - SIGNUP' });
});

router.post('/signup', function(request, response) {
  var username = request.body.username;
  var email = request.body.email;
  var password = request.body.password;
  var repassword = request.body.password2;
  const saltRounds = 10;
  
  var reMail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  var reUsername = /^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/;

  var errors = [];
  var message;
  var isValid = true;

  if(!reUsername.test(username) && !username){
    message = {"message": "Something is wrong with your username, No offence"};
    errors.push(message);
    isValid = false;
  }
  if(!reMail.test(email)){
    message = {"message": "Your mail is worng"};
    errors.push(message);
    isValid = false;
  }
  if(!password){
    message = {"message": "Password is required"};
    errors.push(message);
    isValid = false;
  }
  if(password != repassword){
    message = {"message": "Password must match"};
    errors.push(message);
    isValid = false;
  }
        
  if(isValid){

    bcrypt.hash(password, saltRounds, function(err, hash) {
      
      db.query('INSERT INTO Users (username, email, password) VALUES(?, ?, ?)', [username, email, hash], (err, results, fields) => {
        if(err) throw err;
        db.query("SELECT MAX(id) AS 'user_id' FROM Users;", (err, results, fields) => {
          if(err) throw err;
          const user_id = results[0].id;
            request.session.user = user_id;
            response.redirect('/');
        });
      });

    });
  }else{
    response.render('signup', { title: 'Register to the Shop Directory', errors: errors });
  }
});


//Logout Route
router.get('/logout', (req, res, next) => {
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;