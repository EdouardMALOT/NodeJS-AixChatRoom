'use strict';
const router = require('express').Router();

//Standards routes
//----------------
router
        .get('/', (req, res, next) => {
            res.render('login');
        })

        .get('/rooms', (req, res, next) => {
            res.render('rooms');
        })

        .get('/chat', (req, res, next) => {
            res.render('chatroom');
        })

        .get('/getsession', (req, res, next) => {
            res.send('My favorite color : ' + req.session.favColor);
        })
        .get('/setsession', (req, res, next) => {
            req.session.favColor = 'light Blue';
            res.send('My favorite is now set ');
        });  


//Default router
//--------------
router.use( (req, res, next) => {
            res.status(404);
            res.sendfile(process.cwd() + '/views/404.htm');
         });

module.exports = { router };
