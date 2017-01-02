'use strict';

if(process.env.NODE_ENV === 'production') {

    //let redisURI = require('url').parse(process.env.REDIS_URL);
    //let redisPassword = redisURI.auth.split(':')[1];

    module.exports = {
        host: "https://aixchat.herokuapp.com",
        dbURI: process.env.dbURI,
        sessionSecret: process.env.sessionSecret,
        fb: {
            clientID: process.env.fbClientID,
            clientSecret: process.env.fbClientSecret,
            callbackURL: "https://aixchat.herokuapp.com/auth/facebook/callback",
            profileFields: ["id", "displayName", "photos"]
        }
        //redis : {
        //    host: redisURI.hostname,
        //    port: redisURI.port,
        //    password: redisPassword
        //}
    };
    
}else{
    module.exports = require('./developer.json');
}