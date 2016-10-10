var
  passport = require('passport')

module.exports = {
  showLogin: function(req, res) {
    res.render('login')
  },

  login: passport.authenticate('local-login', {
    successRedirect: '/profile',
    failureRedirect: '/login'
  })
}
