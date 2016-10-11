var
  passport = require('passport')
  User = require('../models/User.js')


module.exports = {

  showLogin: function(req, res) {
    res.render('login')
  },

  login: passport.authenticate('local-login', {
    successRedirect: '/hub',
    failureRedirect: '/login'
  })
}
