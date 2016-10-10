//user routes
var
  express = require('express'),
  userRouter = express.Router(),
  passport = require('passport'),
  usersCtrl = require('../controllers/users.js')

userRouter.route('/login')
  .get(usersCtrl.showLogin)
  .post(usersCtrl.login)

userRouter.route('/signup')
  .get(function(req, res) {
    res.render('signup')
  })
  .post(passport.authenticate('local-signup', {
    successRedirect: '/meetup/categories',
    failureRedirect: '/signup'
  }))

userRouter.get('/profile', isLoggedIn, function(req, res) {
  // render the user profile
  res.render('profile', {user: req.user})
})

userRouter.get('/logout', function(req, res) {
  // destroy the session and redirect to the home page...
  req.logout()
  res.redirect('/')
})


function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()) return next()
  res.redirect('/')
}

module.exports = userRouter
