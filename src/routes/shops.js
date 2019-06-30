var express = require('express');
var router = express.Router();
var moment = require('moment');
const db = require('../db.js');

router.get('/like/:id', (req, res, next) => {
    if(req.session.user){
        var store_id = req.params.id;
        var user_id = req.session.user;
        var liked = 1;

        db.query('SELECT * FROM shops WHERE id = ?', [store_id], function(error, results, fields) {
            if (results.length > 0) {
                db.query('SELECT * FROM shop_status WHERE shop = ?', [store_id], function(error, results, fields) {
                    if (results.length > 0) {
                        var status_id = results[0].id;
                        if(results[0].status == 1){
                            res.redirect('/');
                        }else{
                            db.query('UPDATE shop_status SET status = 1 WHERE id = ?', [status_id], (err, results, fields) => {
                                if(err) throw err;
                                res.redirect('/pref');
                            });
                        }
                    } else{
                        db.query('INSERT INTO shop_status (shop, user, status) VALUES(?, ?, ?)', [store_id, user_id, liked], (err, results, fields) => {
                            if(err) throw err;
                            res.redirect('/pref');
                        });
                    }
                })
            }else{
                res.redirect('/');
            }
        });

    }else{
        res.redirect('/auth/login');
    }
});

router.get('/dislike/:id', (req, res, next) => {
    //Dislike A shop
    //Won't Show in nearby shop intil the next 2h
    //Get Store_ID and User_ID and TimeClicked
    if(req.session.user){
        var store_id = req.params.id;
        var user_id = req.session.user;
        
        //Test if this selected Shop is available
        db.query('SELECT * FROM shops WHERE id = ?', [store_id], function(error, results, fields) {
            if (results.length > 0) {
                //Test if it's already disliked
                db.query('SELECT * FROM dislike WHERE store = ?', [store_id], function(error, results, fields) {
                    if (results.length > 0) {
                        //Already Disliked
                        var now = moment().format("YYYY-MM-DD HH:mm:ss");
                        var done = moment().add(2, 'hours').format("YYYY-MM-DD HH:mm:ss");

                        db.query('UPDATE dislike SET disliked_at = ? , removed_at = ? WHERE id = ?', [now, done, results[0].id], (err, results, fields) => {
                            if(err) throw err;
                            res.redirect('/');
                        });

                        res.redirect('/');
                    }
                    else{
                        //Store in Database and return to home
                        //Get Date in Time
                        var now = moment().format("YYYY-MM-DD HH:mm:ss");
                        var done = moment().add(2, 'hours').format("YYYY-MM-DD HH:mm:ss");

                        db.query('INSERT INTO dislike (store, user, disliked_at, removed_at) VALUES(?, ?, ?, ?)', [store_id, user_id, now, done], (err, results, fields) => {
                            if(err) throw err;
                            res.redirect('/');
                        });

                    }
                })
            }
        })
    }else{
        res.redirect('/auth/login');
    }
});

router.get('/remove/:id', (req, res, next) => {
    if(req.session.user){
        var store_id = req.params.id;
        var user_id = req.session.user;

        db.query('SELECT * FROM shops WHERE id = ?', [store_id], function(error, results, fields) {
            if (results.length > 0) {
                db.query('SELECT * FROM shop_status WHERE shop = ? AND USER = ?', [store_id, user_id], (err, results, fields) => {
                    var status_id = results[0].id;
                    if(status_id){

                        db.query('UPDATE shop_status SET status = 0 WHERE id = ?', [status_id], (err, results, fields) => {
                            if(err) throw err;
                            res.redirect('/pref');
                        });

                    }else{
                        res.redirect('/pref');
                    }
                        

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