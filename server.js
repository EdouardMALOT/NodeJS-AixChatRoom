'use strict';
const express = require('express');
const app =  express();

app.use(express.static('public'));
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');


app.get('/', (req, res, next) => {
    res.render('login', {pageTitle: 'My login page'});
});

let port = app.get('port');
app.listen(port, () => console.log("Server listen on port", port));

