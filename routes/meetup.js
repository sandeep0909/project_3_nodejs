var
express = require('express'),
meetupRouter = express.Router(),
meetupController = require('../controllers/meetup.js')

// meetupRouter.get('/meetup/categories', meetupController.categories);
// meetupRouter.get('/meetup/categories', meetupController.cities);
// meetupRouter.get('/meetup/cities', meetupController.cities);
// meetupRouter.get('/meetup/topics', meetupController.topics);
// meetupRouter.get('/meetup/openEvents', meetupController.openEvents);
meetupRouter.get('/meetup/specificEvent', meetupController.specificEvent);
meetupRouter.get('/hub', meetupController.hub);
meetupRouter.get('/meetup/searchResults', meetupController.searchResults);
meetupRouter.get('/meetup/eventSearch', meetupController.eventSearch);
// pagesRouter.get('/', pagesController.index);
 module.exports = meetupRouter
