//routes.js

//initialize express router
let router = require('express').Router();

//set default API response
router.get('/', function(req, res) {
    res.json({
        status: 'API Works',
        message: 'Welcome to First Rest API'
    });
});

var mediaController = require('./mediaController');
router.route('/media/movies-new-to-old')
    .get(mediaController.moviesNew2Old);
router.route('/media/movie-ratings')
    .get(mediaController.moviesRatingHigh2Low);
router.route('/media/watched-ratings')
    .get(mediaController.watchedMyRatingsHigh2Low);
router.route('/media/most-voted')
    .get(mediaController.mediaMostVoted);
router.route('/media/series-ratings')
    .get(mediaController.seriesRatingHigh2Low);
router.route('/media')
    .get(mediaController.index)
    .post(mediaController.add);
router.route('/media/:mediaId')
    .get(mediaController.view)
    .patch(mediaController.update)
    .put(mediaController.update)
    .delete(mediaController.delete);
router.route('/movies/:mediaId')
    .get(mediaController.view);
router.route('/series/:mediaId')
    .get(mediaController.view);


var userController = require('./usersController');
router.route('/users')
    .get(userController.index);
router.route('/register')
    .post(userController.add);
router.route('/login')
    .post(userController.login)
router.route('/users/:users_id')
    .get(userController.view)
    .patch(userController.update)
    .put(userController.update)
    .delete(userController.delete);

//Import Player Controller
var playerController = require('./playerController');
// Player routes
router.route('/players/most-touchdown-passes')
    .get(playerController.mostTDs);
router.route('/players/most-rushing-yards')
    .get(playerController.mostRushYds);
router.route('/players/least-rushing-yards')
    .get(playerController.leastRushYds);
router.route('/players/most-to-least-field-goals')
    .get(playerController.most2LeastFGs);
router.route('/players/most-sacks')
    .get(playerController.mostSacks);
router.route('/players')
    .get(playerController.index)
    .post(playerController.add);
router.route('/players/:player_id')
    .get(playerController.view)
    .patch(playerController.update)
    .put(playerController.update)
    .delete(playerController.delete);

//Export API routes
module.exports = router;