'use strict';
const session = require('express-session');
const mongoStore = require('connect-mongo')(session);
const config = require('../config');
const db = require('../db'); 



if(process.env.NODE_ENV === 'production') {
    //Init the session with settings for production
      module.exports = session({
        secret: config.sessionSecret,
        resave: false,
        saveUninitialized: false,
        store: new mongoStore({
                 mongooseConnection: db.mongoose.connection 
              })
    });  
}else{
    //Init for dev 
    module.exports = session({
        secret: config.sessionSecret,
        resave: false,
        saveUninitialized: true
    });
}