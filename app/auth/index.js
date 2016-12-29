'use strict';

const passport = require('passport');
const config = require('../config');
const FacebookStrategy = require('passport-facebook').Strategy;
const db = require('../db');


//Helper
//------
    let findOne = profileID => {
        return db.userModel.findOne({
            'ProfilId': profileID
        });
    }

    // The ES6 promisified version of findById
    let findById = id => {
        return new Promise((resolve, reject) => {
            db.userModel.findById(id, (error, user) => {
                if(error) {
                    reject(error);
                } else {
                    resolve(user);
                }
            });
        });
    }
 

    let createNewUser = (profile) => {
        return new Promise((resolve, reject) => {

            console.log("createNewUser called");
        
            let newChatUser= new db.userModel({
                ProfilId: profile.id,
                fullName: profile.displayName,
                ProfilPic: profile.photos[0].value || ''
            });

            newChatUser.save((error) => {
                if(error) {
                    reject(error);
                }else{
                    resolve(newChatUser);
                }
            });

        });
    };

module.exports = () => {
	passport.serializeUser((user, done) => {
		done(null, user.id);
	});

	passport.deserializeUser((id, done) => {
		// Find the user using the _id
		findById(id)
			.then(user => done(null, user))
			.catch(error => console.log('Error when deserializing the user: ' + error));
	});

	let authProcessor = (accessToken, refreshToken, profile, done) => {

        console.log("authProcessor");
        
		// Find a user in the local db using profile.id
		// If the user is found, return the user data using the done()
		// If the user is not found, create one in the local db and return
		findOne(profile.id)
			.then(chatUser => {
				if(chatUser) {
					done(null, chatUser);
				} else {
					// Create a new user and return
					createNewUser(profile)
						.then(newChatUser => done(null, newChatUser))
						.catch(error => console.log('Error when creating new user: ' + error));
				}
			});
	}

	passport.use(new FacebookStrategy(config.fb, authProcessor));
}