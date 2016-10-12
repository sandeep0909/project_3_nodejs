var
  User = require('../models/User.js'),
  Event = require('../models/Event.js')
module.exports = {

  new: function(req,res){
    res.render('createEvent',{userId: req.params.id})

  },

    index: function(req, res) {
        User.findById(req.params.id).populate('intEvents').exec(function(err, user) {
            //res.json(user.intEvents)
            res.render('intEvents', {events: user.intEvents, user: user})
        })

    },
    create: function(req, res) {
      console.log(req.body);
        User.findById(req.params.id, function(err, user) {
            var newEvent = new Event(req.body)
            newEvent._by = user._id
                //populated _by with User Id
            newEvent.save(function(err) {
                if (err) return console.log(err)
                user.intEvents.push(newEvent)
                user.save(function(err) {
                  //res.json(user)
                  res.redirect('/users/'+req.params.id+'/events')
                })
            })
        })
    },

    show: function(req, res) {
        Event.findById(req.params.id, function(err, eventdata) {
            if (err) return console.log(err)
            //res.json(eventdata)
            res.render('internalEvent')
        })
    },
    update: function(req, res) {
        Event.findByIdAndUpdate(req.params.id, req.body, {new: true},
            function(err, event) {
            res.json({message: "Event updated!", event:event})
        })
    },
    destroy: function(req, res){
         Event.findByIdAndRemove(req.params.id, function(err){
           if(err) return console.log(err)
           User.findById(req.user._id, function(err, user){
             if(err) return console.log(err)
             user.update({$pull: {paths: req.params.id}}, function(err){
               if(err) return console.log(err)
               res.redirect('/hub')
             })
           })
         })
     },
}
