'use strict';
const router = require('express').Router();
const passport = require('passport');

//Standards routes
//----------------
router
        .get('/', (req, res, next) => {
            res.render('login');
        })

        .get('/rooms', (req, res, next) => {
            console.log(" ");
            console.log(" ");
            console.log(" ");
            console.log(" ");
            console.log("user = ");
            
            console.dir(req.user);
            res.render('rooms', { user: req.user});
        })

        .get('/chat', (req, res, next) => {
            res.render('chatroom');
        })

        .get('/auth/facebook', passport.authenticate('facebook'))

        .get('/auth/facebook/callback', passport.authenticate('facebook', {
				successRedirect: '/rooms',
				failureRedirect: '/'
			})
        );

//Default router
//--------------
router.use( (req, res, next) => {
            res.status(404);
            res.sendfile(process.cwd() + '/views/404.htm');
         });

module.exports = { router };