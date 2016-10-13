// var Meetup = require('../models/filename.js') //import required model
var request = require('request');
var Event = require('../models/Event.js');
var User = require('../models/User.js')

module.exports = {
specificEvent,
hub,
eventSearch,
searchResults,
addEvent,
eventIndex
}

function searchResults(req, res) {
    console.log(req.query)
    var urlpath
    //
    if(req.query.category) {
    urlpath = '&category='+req.query.category
      }
    if( req.query.topic) {
    urlpath = urlpath + '&topic='+req.query.topic
    }
    var city = '&city='+req.query.city;
    var zip = '&zip='+req.query.zip;
    var textsearch = '&text='+req.query.textsearch
    var key = '&key=6f5a18185325c31113220103533684b'
    // var apiurl = 'https://api.meetup.com/2/open_events?category=34&text=javascript&key=6f5a18185325c31113220103533684b'
    var apiurl = 'https://api.meetup.com/2/open_events?'+urlpath+city+zip+textsearch+key
    // console.log(urlpath)
    // console.log(apiurl)
    request.get(apiurl, function(err, response, body) {
        var results = []
        var data = JSON.parse(body).results;
        data.forEach(function(el){
          //  results.push(el.id)
           results.push({
             eventId: el.id,
             name: el.name,
             urlName: el.group.urlname,
             groupName: el.group.name,
             who: el.group.who


           })
        })
        // console.log(results)
        res.send(results)
    })
}

function specificEvent(req, res) {
    console.log(req.query.eventId)
    var urlprefix = 'https://api.meetup.com/'
    var urlname = 'build-with-code/'
    var eventid = '234586692'
    var apiKey = '?&key=6f5a18185325c31113220103533684b'
    var url = urlprefix+req.query.url+'/events/'+req.query.eventId+apiKey
    // var apiurl = 'https://api.meetup.com/Square-Dance-in-West-LA/events/tjfzxlywcbgb?&key=6f5a18185325c31113220103533684b'
    request.get(url, function(err, response, body) {
        var results = []
        var data = JSON.parse(body);
        console.log(data);
        // res.send(data)
        res.render("event.ejs", {data: data})
      })
}

function hub(req, res) {
  res.render("hub.ejs")
}

function hub(req, res) {
  res.render("hub.ejs")
}


function eventSearch(req, res) {
    var results = [ [''], [''], [''] ];
    // console.log(currentUser._id);
    function topics(error, response, body) {
        if (!error && response.statusCode === 200) {
          var data = JSON.parse(body).results;
          // console.log(data)
          data.forEach(function(el){
            results[2].push({
                topicId: el.id,
                urlkey: el.urlkey
          })
        })
    }
    // console.log(data)
    request('https://api.meetup.com/2/cities?key=6f5a18185325c31113220103533684b', cities);
  }

    //setup for cities API
    function cities(error, response, body) {
        if (!error && response.statusCode === 200) {
            var data = JSON.parse(body).results;
            data.forEach(function(el) {
                results[0].push({
                    cityId: el.id,
                    cityName: el.city,
                    zip: el.zip
                })
            })
        }
        request('https://api.meetup.com/2/categories?key=6f5a18185325c31113220103533684b', categories);
    }

    //set up for categories API
    function categories(error, response, body) {
        if (!error && response.statusCode === 200) {
            var data = JSON.parse(body).results;
            data.forEach(function(el) {
                    results[1].push({
                        catId: el.id,
                        catName: el.shortname
                    })
                }) //categories are to be searched by id
        }
        // res.send(results);
        res.render("meetup.ejs", {
            results: results
        })
    }

    request('https://api.meetup.com/topics?key=6f5a18185325c31113220103533684b', topics)

}

function addEvent(req, res){
  // console.log(req.body)
  console.log(req.user)
  var eventProps = {
    name: req.body.name,
    evtId: req.body.evtId,
    extId: req.body.extId,
    external: true,
    description: req.body.description,
    _by: req.user
  }
  Event.create(eventProps, function(err, event) {
    User.findById(req.user._id, function(err, user){
      if(err) return console.log(err);
      user.extEvents.push(event.extId)
      user.save(function(err, user){
        if(err) return console.log(err);
        res.render('addEvent.ejs', {event: event})
      })
    })

  })

}

function eventIndex(req, res) {

}
