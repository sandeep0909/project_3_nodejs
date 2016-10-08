var
express = require('express'),
meetupRouter = express.Router()
meetupController = require('../controllers/meetup.js')

meetupRouter.route('/meetup/:id')
.get(meetupController.show)



 module.exports = meetupRouter
