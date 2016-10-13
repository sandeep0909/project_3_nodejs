var
  dotenv = require('dotenv').load({silent:true}),
  express = require('express'),
  app = express(),
  logger = require('morgan'),
  ejsLayouts = require('express-ejs-layouts'),
  meetupRoutes = require('./routes/meetup.js'),
  mongoose = require('mongoose'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
  server = require('http').createServer(app), //added incase we use websockets
  socket = require('socket.io')(server),
  request = require('request'),
  passport = require('passport'),
	passportConfig = require('./config/passport.js'),
  session = require('express-session'),
  MongoStore = require('connect-mongo')(session),
  userRoutes = require('./routes/users.js'),
  eventRoutes = require('./routes/events.js'),
  cookieParser = require('cookie-parser'),
  PORT = process.env.PORT || 3000
  var mongoConnectionString = 'mongodb://localhost/passport-authentication'

//database connection
mongoose.connect('mongodb://localhost/project3', function(err) {
    if (err) {
        console.log("Problem connecting to Mongo. Check if mongod is activated")
    } else {
        console.log("Connected to Mongo!")
    }
})

//middleware

  app.use(logger('dev'));
  app.use(methodOverride('_method'))
  app.use(bodyParser.json()); //
  app.use(bodyParser.urlencoded({extend: true})); //
  app.use(cookieParser())
  app.use(session({
  	secret: 'boomchakalaka',
  	cookie: {maxAge: 6000000},
  	resave: true,
  	saveUninitialized: false,
    store: new MongoStore({url: mongoConnectionString})
  }))
  app.use(passport.initialize());
  app.use(passport.session());

  app.use(function(req, res, next){
      if(req.user) req.app.locals.currentUser = req.user
      req.app.locals.loggedIn = !!req.user
      next()
  });

  //////SETTING CURRENT USER
  app.use(function(req,res,next){
	if(req.user) req.app.locals.currentUser = req.user
	req.app.locals.loggedIn = !!req.user
	next()
});

//settings
  app.set('view engine', 'ejs'); // to set the view engine which is EJS
  app.use(ejsLayouts); //to use the layouts. Lets it know where to look for view like rails
  app.use(express.static(__dirname + '/public')); // to get static public files
  // app.use(express.static('/public')); // to get static public files


//Meetup to routes

app.use('/', meetupRoutes)
////// SANDEEP CHANGES HERE /////
app.get('/',function(req,res){
  res.render('splash.ejs')

})

///// INTERNAL ROUTES ////

app.use('/', userRoutes)
app.use('/', eventRoutes)

//server
server.listen(PORT,function(err){
  console.log(err || "Server running on port"+PORT)
})
