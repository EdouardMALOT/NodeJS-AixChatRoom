'use strict';
const express = require('express');
const app =  express();
require('./app/auth')();
const routes = require('./app/routes/');
const session = require('./app/session');
const passport = require('passport');

app.set('port', process.env.PORT || 3000);
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use(session);
app.use(passport.initialize());
app.use(passport.session());
app.use('/', routes.router);


let port = app.get('port');

//IO server
    let ioServer = app => {
        app.locals.chatRooms = [];
        const server = require('http').Server(app);
        const io = require('socket.io')(server);
        io.use( (socket, next) => { session(socket.request, {}, next) });
        require('./app/socket')(io, app);
        return server;
    }

ioServer(app).listen(port, () => console.log("Server listen on port", port));

