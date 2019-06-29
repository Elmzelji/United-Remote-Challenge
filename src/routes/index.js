var express = require('express');
var router = express.Router();
const db = require('../db.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.session.user);
  if(req.session.user){

    db.query('SELECT id, username, email FROM users WHERE id = ?', [req.session.user], function(error, results, fields) {
			if (results.length > 0) {
        
        db.query('SELECT s.`*` FROM shops s LEFT JOIN shop_status ss ON s.id = ss.shop WHERE ss.status IS NULL OR ss.status = 0 UNION SELECT s.* FROM shops s RIGHT JOIN shop_status ss ON s.id = ss.shop WHERE ss.status IS NULL OR ss.status = 0', function(error, shops, fields) {
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

/* Get Pref Page */
router.get('/pref', (req, res, next) => {
  if(req.session.user){

    db.query('SELECT id, username, email FROM users WHERE id = ?', [req.session.user], function(error, results, fields) {
      if (results.length > 0) {
        db.query("SELECT s.id AS 'store_id', s.*, ss.`*` FROM shops s JOIN shop_status ss ON s.id = ss.shop JOIN users u ON u.id = ss.user WHERE ss.`status` = 1 AND u.id = ?", [req.session.user], function(error, shops, fields) {
          res.render('pref', { title: 'Prefered Shops', user: {id: results[0].id, username: results[0].username, email: results[0].email}, shops:shops });
        })
      }
    });

    
  }else{
    res.redirect('/auth/login');
  }
});

module.exports = router;