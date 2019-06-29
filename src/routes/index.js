var express = require('express');
var router = express.Router();
const db = require('../db.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.session.user);
  if(req.session.user){

    db.query('SELECT id, username, email FROM users WHERE id = ?', [req.session.user], function(error, results, fields) {
			if (results.length > 0) {
        
        db.query('SELECT * FROM shops', function(error, shops, fields) {
          res.render('index', { title: 'Shop Directory', user: {id: results[0].id, username: results[0].username, email: results[0].email}, shops:shops });
        })

			}		
		});

  }else{
    db.query('SELECT * FROM shops', function(error, shops, fields) {
      res.render('index', { title: 'Shop Directory', shops: shops });
    })
  }
});

module.exports = router;