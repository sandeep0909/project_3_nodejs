//user routes
var
  express = require('express'),
  userRouter = express.Router(),
  passport = require('passport'),
  usersCtrl = require('../controllers/users.js'),
  User = require('../models/User.js')

  userRouter.route('/users')
    // .get(usersCtrl.index)
    .get(function(req,res){
      User.find({},function(err,users){
        if(err) return console.log(err)
        res.json(users)
      })
    })
  userRouter.route('/users/:id')
    .get(function(req,res){
      User.findById(req.params.id,function(err,user){
        res.json(user)
    })
  })

userRouter.route('/login')
  .get(usersCtrl.showLogin)
  .post(usersCtrl.login)

userRouter.route('/signup')
  .get(function(req, res) {
    res.render('signup')
  })
  .post(passport.authenticate('local-signup', {
    successRedirect: '/',
    failureRedirect: '/signup'
  }))

userRouter.get('/profile', isLoggedIn, function(req, res) {
  // render the user profile
  res.render('profile', {user: req.user})
})

userRouter.get('/profile/edit', function(req,res){
  res.render('editProfile')
})
userRouter.get('/logout', function(req, res) {
  // destroy the session and redirect to the home page...
  req.logout()
  res.redirect('/')
})

userRouter.patch('/profile', function(req,res){
  User.findById(req.user._id, function(err, user){
    if(err) return console.log(err)
    for(key in req.body.local){
      if(req.body.local[key]) user.local[key] = req.body.local[key]
    }
    user.save(function(err){
      res.redirect('/')
    })
    console.log(req.body)
  })
})

function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()) return next()
  res.redirect('/')
}

module.exports = userRouter
