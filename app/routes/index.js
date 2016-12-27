'use strict';
const router = require('express').Router();

router
        .get('/', (req, res, next) => {
            res.render('login');
        })

        .get('/rooms', (req, res, next) => {
        res.render('rooms');
        })

        .get('/chat', (req, res, next) => {
        res.render('chatroom');
        });

module.exports = { router };
