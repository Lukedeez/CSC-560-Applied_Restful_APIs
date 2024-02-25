//bioModel.js
var mongoose = require('mongoose');
//schema
var playerSchema = mongoose.Schema({
    jerseyNumber: Number,
    name: String,
    position: String,
    seasonYear: Number,
    rushingYards: Number,
    touchdownsThrown: Number,
    sacks: Number,
    sacked: Number,
    fieldGoalsMade: Number,
    fieldGoalsMissed: Number,
    catchesMade: Number
});
// Export Players Model
var players = module.exports = mongoose.model('player', playerSchema);
module.exports.get = function (callback, limit) {
    Players.find().limit().then(function(player){
       console.log('Model: '+player);
    });
}