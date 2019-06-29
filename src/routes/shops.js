var express = require('express');
var router = express.Router();
const db = require('../db.js');

router.get('/like/:id', (req, res, next) => {
    if(req.session.user){
        var store_id = req.params.id;
        var user_id = req.session.user;
        var liked = 1;

        db.query('SELECT * FROM shops WHERE id = ?', [store_id], function(error, results, fields) {
            if (results.length > 0) {
                db.query('INSERT INTO shop_status (shop, user, status) VALUES(?, ?, ?)', [store_id, user_id, liked], (err, results, fields) => {
                    if(err) throw err;
                    res.redirect('/pref');
                });
            }else{
                res.redirect('/');
            }
        });

    }else{
        res.redirect('/auth/login');
    }
});

router.get('/dislike/:id', (req, res, next) => {
    if(req.session.user){
        var store_id = req.params.id;
        var user_id = req.session.user;
        var liked = 0;

        db.query('SELECT * FROM shops WHERE id = ?', [store_id], function(error, results, fields) {
            if (results.length > 0) {
                db.query('INSERT INTO shop_status (shop, user, status) VALUES(?, ?, ?)', [store_id, user_id, liked], (err, results, fields) => {
                    if(err) throw err;
                    res.redirect('/pref');
                });
            }else{
                res.redirect('/');
            }
        });

    }else{
        res.redirect('/auth/login');
    }
});

module.exports = router;