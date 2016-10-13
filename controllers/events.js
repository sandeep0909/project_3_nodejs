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
    allExtEvents: function(req, res) {
        Event.find({_by: req.user._id}, function(err, ExtEvents) {
            res.json(ExtEvents)
            //res.render('intEvents', {events: intEvents})
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
        Event.findById(req.params.eventId, function(err, eventData) {
            if (err) return console.log(err)
            console.log(eventData);
            //res.json(eventdata)
            res.render('internalEvent', {eventData: eventData})
        })
    },

    edit: function(req,res){
      console.log(req.body);
      Event.findById(req.params.eventId, function(err, event) {
          if (err) return console.log(err)
          console.log(event);
          //res.json(eventdata)
          res.render('updateEvent',{event: event})
      })
    },
    update: function(req, res) {
        Event.findByIdAndUpdate(req.params.eventId, req.body, {new: true},
            function(err, eventData) {
            //res.json({message: "Event updated!", event:event})
            res.render('internalEvent', {eventData: eventData})
        })
    },
    destroy: function(req, res){
      console.log("entering Delete");
     Event.findById(req.params.eventId, function(err, event){
       if(err) return console.log(err)
       event.remove(function(err) {
         if(err) return console.log(err)
         User.findById(event._by, function(err, user){
           if(err) return console.log(err)
           user.update({$pull: {paths: req.params.id}}, function(err){
             if(err) return console.log(err)
             //res.redirect('/users/'+req.params.id+'/events')
             res.redirect('../hub')
           })
         })
       })
      })

     }
}
