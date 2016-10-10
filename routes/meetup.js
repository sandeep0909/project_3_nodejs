var
express = require('express'),
meetupRouter = express.Router(),
meetupController = require('../controllers/meetup.js')

meetupRouter.get('/meetup/categories', meetupController.categories);
// meetupRouter.get('/meetup/categories', meetupController.cities);
meetupRouter.get('/meetup/cities', meetupController.cities);
meetupRouter.get('/meetup/topics', meetupController.topics);
meetupRouter.get('/meetup/openEvents', meetupController.openEvents);
meetupRouter.get('/meetup/specificEvent', meetupController.specificEvent);

// pagesRouter.get('/', pagesController.index);
 module.exports = meetupRouter
