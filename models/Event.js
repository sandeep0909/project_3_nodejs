var
  mongoose = require('mongoose')
  eventSchema = mongoose.Schema({
    name: {type: String, required: true},
    category: String
    external: Boolean
    date: Date
    time: Date
    address: String

    //users:[{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
    _by: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  })

var Event = mongoose.model('Event', eventSchema)
module.exports = Event
