'use strict';
const router = require('express').Router();
const passport = require('passport');
const config = require('../config');
const helper = require('../helper');


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
            res.render('rooms', { user: req.user, hostUrl: config.host});
        }])

        .get('/chat/:id', [isAuthenticated, (req, res, next) => {

            //Check if the rooms exist
            let room = helper.getRoomFromId(req.app.locals.chatRooms, req.params.id);
            
            if(room !== undefined) {            
                res.render('chatroom', {
                    user: req.user, 
                    hostUrl: config.host, 
                    roomTitle: room.room,
                    roomId: room.roomID
                });
            }else{
                 return next();
             }
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