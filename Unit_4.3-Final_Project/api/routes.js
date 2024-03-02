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

//Export API routes
module.exports = router;