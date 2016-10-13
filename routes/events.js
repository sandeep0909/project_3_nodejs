var express = require('express'),
    eventRouter = express.Router(),
    eventsController = require('../controllers/events.js'),
    usersController = require('../controllers/users.js'),
    User = require('../models/User.js'),
    Event = require('../models/Event.js')


eventRouter.route('/users/:id/events/new')
    .get(eventsController.new)

eventRouter.route('/users/:id/events')
    .get(eventsController.index)
    .post(eventsController.create)


eventRouter.route('/events/:eventId/edit')
    .get(eventsController.edit)
eventRouter.route('/events/:eventId')
    .patch(eventsController.update)
    .delete(eventsController.destroy)
    .get(eventsController.show)

module.exports = eventRouter
