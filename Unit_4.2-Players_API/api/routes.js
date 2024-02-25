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