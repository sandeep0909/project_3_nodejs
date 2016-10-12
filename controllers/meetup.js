// var Meetup = require('../models/filename.js') //import required model
var request = require('request')

module.exports = {
specificEvent,
hub,
eventSearch,
searchResults
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
             urlName: el.group.urlname
           })
        })
        console.log(results)
        res.send(results)
    })
}

// function openEvents(req, res) {
//
//     var apiurl = 'https://api.meetup.com/2/open_events?category=34&text=javascript&key=6f5a18185325c31113220103533684b'
//     request.get(apiurl, function(err, response, body) {
//         var results = []
//         var data = JSON.parse(body).results;
//         data.forEach(function(el){
//            results.push('<li>'+el.name +'</li>')
//         })
//         console.log(results)
//         res.render("meetupsearch.ejs", {results: results})
//     })
// }

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
  res.render("calendar.ejs")
}

function eventSearch(req, res) {
    var results = [ [''], [''], [''] ];

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



// method to convert time field from API to a date string
//   var timestamp = 1483585200000; //comes from the API response
//   var date = new Date(timestamp-28800000);
//   var iso = date.toISOString().match(/(\d{4}\-\d{2}\-\d{2})T(\d{2}:\d{2}:\d{2})/)
//   console.log(iso[1] + ' ' + iso[2]);
//
// })
