'use strict';
const express = require('express');
const app =  express();
const chatRoutes = require('./app/routes/');


app.use(express.static('public'));
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');

app.use('/', chatRoutes.router);


let port = app.get('port');
app.listen(port, () => console.log("Server listen on port", port));

