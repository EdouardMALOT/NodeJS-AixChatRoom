'use strict';

const config = require('../config');
const mongoose = require('mongoose').connect(config.dbURI);

//Log error listener
    mongoose.connection.on('error', error => {
        console.log("Mongoose db error :", error);
    });

module.exports = { mongoose};