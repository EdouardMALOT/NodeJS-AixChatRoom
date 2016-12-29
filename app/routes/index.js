'use strict';
const router = require('express').Router();
const passport = require('passport');


//Helper function
//---------------
    let isAuthenticated = (req, res, next) => {
        if(req.isAuthenticated()) {
            next();
        }else{
            console.log(`An user try to access to \"${req.url}\" private pages without being login`)
            res.redirect('/');
        }
    }

//Standards routes
//----------------
router
        .get('/', (req, res, next) => {
            res.render('login');
        })

        .get('/rooms', [isAuthenticated, (req, res, next) => {
            res.render('rooms', { user: req.user});
        }])

        .get('/chat', [isAuthenticated, (req, res, next) => {
            res.render('chatroom', {user: req.user});
        }])

        .get('/logout', (req, res, next) => {
            console.log("Logout called");
            req.logout();       //Call passport logout function
            res.redirect('/');
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