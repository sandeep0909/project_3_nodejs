var
  dotenv = require('dotenv').load({silent:true}),
  express = require('express'),
  app = express(),
  logger = require('morgan'),
  ejsLayouts = require('express-ejs-layouts'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  server = require('http').createServer(app), //added incase we use websockets
  socket = require('socket.io')(server),
  request = require('request'),
  PORT = process.env.PORT || 3000



//database connection
mongoose.connect('mogodb://localhost/project3', function(err) {
    if (err) {
        console.log("Problem connecting to Mongo. Check if mongod is activated")
    } else {
        console.log("Connected to Mongo!")
    }
})

//middleware
app.use(logger('dev'))
app.use(bodyParser.json()) //
app.use(bodyParser.urlencoded({extend: true})); //


//settings
app.set('view engine', 'ejs') // to set the view engine which is EJS
app.use(ejsLayouts) //to use the layouts. Lets it know where to look for view like rails
app.use(express.static(__dirname + '/public')) // to get static public files


//link to routes
// meetupRoutes = require('./routes/meetup.js')

app.get('/meetup/categories', function(req, res) {
    var apiurl = 'https://api.meetup.com/2/categories?key=6f5a18185325c31113220103533684b'
    request.get(apiurl, function(err, response, body) {
        res.send(body)
    })
})



//server
server.listen(PORT,function(err){
  console.log(err || "Server running on port"+PORT)
})
