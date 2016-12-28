'use strict';

const passport = require('passport');
const config = require('../config');
const facebookStrategie = require('passport-facebook').Strategy;

module.exports = () => {
    passport.use(new facebookStrategie(config.fb));
}