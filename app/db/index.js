'use strict';

const config = require('../config');
const logger = require('../logger');
const mongoose = require('mongoose').connect(config.dbURI);


//Log error listener
    mongoose.connection.on('error', error => {
        logger.log('error', 'Mongoose db error :'+ error);
    });

//User schéma
    const chatUser = new mongoose.Schema({
        ProfilId: String,
        fullName: String,
        ProfilPic: String
    });

//model
    let userModel = mongoose.model('chatUser', chatUser);



module.exports = { mongoose, userModel };