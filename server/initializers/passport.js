'use strict';

const passport = require('passport');
const jwt = require('jwt-simple');
const LocalStrategy = require('passport-local').Strategy;
// const TwitterStrategy = require('passport-twitter').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;

const User = require('../models').User;

const {
  JWT_TOKEN
} = require('../config/config');

/*
passport.use(new LocalStrategy({
  session: false,
  usernameField: 'email',
  passwordField: 'password',
 }, (email, password, done) => {
  User.find({ where: { email } })
    .then((user) => {
      if (!user) { return done(null, false); }
      console.log("USER FOUND NAME!", user.name)
      console.log("User is password: ", user.isValidPassword('123456'));
      return user;
    //return Promise.all([user, user.isValidPassword(password)]);
    })
    .then(([user, isValid]) => {
      if (!isValid) { return done(null, false); }
      return done(null, user);
    })
    .catch(done);
}));
*/


passport.use(new LocalStrategy({
  session: false,
  usernameField: 'email',
  passwordField: 'password',
}, (email, password, done) => {
  User.findOne({
      where: {
        email
      }
    })
    .then((user) => {
      if (!user) {
        return done(null, false);
      }
      return Promise.all([user, user.isValidPassword(password)]);
    })
    .then(([user, isValid]) => {
      if (!isValid) {
        return done(null, false);
      }
      return done(null, user);
    })
    .catch(done);
}));

// passport.use(new TwitterStrategy({
//   consumerKey: process.env.TWITTER_CONSUMER_KEY,
//   consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
//   callbackURL: "http://127.0.0.1:8000/auth/twitter/callback"
// },
//   (token, tokenSecret, profile, cb) => {
//     console.log("TOKEN", token);
//     console.log("tokenSecret", tokenSecret);
//     console.log("profile", profile.json);
//     User.findOrCreate({ where: { providerId: profile.id, name: profile.displayName, provider: profile.provider } })
//       .spread((user, created) => {
//         console.log(user.get({
//           plain: true
//         }))
//         cb(null, user);
//       })
//       .catch(err => console.log("ERROR. ERROR. ERROR", err))
//   }));



passport.use(new BearerStrategy({
  session: false
}, (token, done) => {
  const decodedToken = jwt.decode(token, JWT_TOKEN);
  const userId = decodedToken && decodedToken.id;
  const expires = decodedToken && new Date(decodedToken.expirationDate);

  if (expires > Date.now()) {
    return User.findById(userId)
      .then(user => done(null, user))
      .catch(done);
  }
  return done(null, false);
}));

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => done(null, user))
    .catch(done);
});

module.exports = {
  JWT_TOKEN
};