var
  passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  User = require('../models/User.js')

passport.serializeUser(function(user, done) {
  done(null, user.id)
})

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user)
  })
})

// PASSPORT LOCAL STRATEGY:

// LOCAL SIGNUP:
passport.use('local-signup', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, function(req, email, password, done) {
  User.findOne({'local.email': email}, function(err, user) {
    // there was a problem:
    if(err) return done(err)
    // email is taken:
    if(user) return done(null, false)
    // create a user if the above doesn't happen:
    var newUser = new User()
    newUser.local.name = req.body.name
    newUser.local.email = email
    newUser.local.password = newUser.generateHash(password)
    newUser.save(function(err) {

      if(err) return console.log(err)
      console.log("User saved, but is it moving forward?")
      return done(null, newUser)
    })
  })
}))

//  LOCAL LOG-IN:
passport.use('local-login', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, function(req, email, password, done) {
  // Make sure that user exists, by searching DB:
  User.findOne({'local.email': email}, function(err, user) {
    if(err) return done(err)
    // "No user found, flash would say so:"
    if(!user) return done(null, false)
    // password is invalid:
    if(!user.validPassword(password)) return done(null, false)

    return done(null, user)

  })
}))

module.exports = passport
