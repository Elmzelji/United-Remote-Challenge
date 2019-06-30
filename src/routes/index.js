var express = require('express');
var router = express.Router();
var moment = require('moment');
const db = require('../db.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.user){

    db.query('SELECT id, username, email FROM users WHERE id = ?', [req.session.user], function(error, results, fields) {
			if (results.length > 0) {
        
        db.query('SELECT s.*, d.disliked_at, d.removed_at FROM shops s LEFT JOIN dislike d ON s.id=d.store LEFT JOIN shop_status ss ON s.id = ss.shop WHERE ss.`status` IS NULL OR ss.`status` = 0', function(error, shops, fields) {
          var now = moment();
          var nearby = [];
          
          shops.forEach(shop => {
            if(shop.removed_at != null){
              var removed_date = moment(shop.removed_at);

              if(now > removed_date && moment(shop.removed_at).isValid()){
                nearby.push(shop);
              }
            }else{
              nearby.push(shop);
            }

          });

          res.render('index', { title: 'Shop Directory', user: {id: results[0].id, username: results[0].username, email: results[0].email}, shops:nearby, date:now });
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