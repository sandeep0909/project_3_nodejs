// var Meetup = require('../models/filename.js') //import required model
var request = require('request')
module.exports = {
categories,
cities,
topics,
openEvents,
specificEvent
}

function categories(req, res) {
    var apiurl = 'https://api.meetup.com/2/categories?key=6f5a18185325c31113220103533684b'
    request.get(apiurl, function(err, response, body) {
        var results = [];
        var data = JSON.parse(body).results;
        data.forEach(function(el) {
            results.push({
                    id: el.id,
                    category: el.shortname
                }) //categories are to be searched by id
        })
        res.send(results)
    })
}

function cities(req, res){
  var apiurl = 'https://api.meetup.com/2/cities?key=6f5a18185325c31113220103533684b'
  request.get(apiurl, function(err, response, body) {
    var results = []
    var data = JSON.parse(body).results;
      res.send(data)
  })
}

function topics(req, res) {
    var apiurl = 'https://api.meetup.com/topics?search=tech&key=6f5a18185325c31113220103533684b'
    //limit results of fields = https://api.meetup.com/topics?search=tech&only=id,name
    request.get(apiurl, function(err, response, body) {
      // if(err) return console.log(err);
      var results = []
      var data = JSON.parse(body).results;
        res.send(data)
    })
}

function openEvents(req, res) {
    var apiurl = 'https://api.meetup.com/2/open_events?category=1&key=6f5a18185325c31113220103533684b'
    request.get(apiurl, function(err, response, body) {
        var results = []
        var data = JSON.parse(body).results;
        // data.forEach(function(el){
        //    results.push(el.shortname)
        // })
        res.send(data)
    })
}

function specificEvent(req, res) {
    //https/urlname/events/eventid?&key
    var apiurl = 'https://api.meetup.com/Square-Dance-in-West-LA/events/tjfzxlywcbgb?&key=6f5a18185325c31113220103533684b'
    request.get(apiurl, function(err, response, body) {
        var results = []
        var data = JSON.parse(body);
        res.send(data)
    })
}

// method to convert time field from API to a date string
//   var timestamp = 1483585200000; //comes from the API response
//   var date = new Date(timestamp-28800000);
//   var iso = date.toISOString().match(/(\d{4}\-\d{2}\-\d{2})T(\d{2}:\d{2}:\d{2})/)
//   console.log(iso[1] + ' ' + iso[2]);
//
// })