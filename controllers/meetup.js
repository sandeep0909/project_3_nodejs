var

Meetup = require('../')

module.export = {
  show: function(req, res) {

                res.json(fruit)
            })


}


app.get('/meetup/categories', function(req, res){
// var id = req.params['id']
  var apiurl = 'https://api.meetup.com/2/categories?key=6f5a18185325c31113220103533684b'
  request.get(apiurl, function(err, response, body) {
  // var results = JSON.parse(body).results.images.original.url
  res.send(body)
  // res.json(response)
  //`img src="${}">`// string interpolation for javascript
})
})
//'https://api.meetup.com/2/events?key=ABDE12456AB2324445&group_urlname=ny-tech&sign=true'
