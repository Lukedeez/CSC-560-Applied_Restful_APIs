//bioModel.js
var mongoose = require('mongoose');
//schema
var playerSchema = mongoose.Schema({
    jerseyNum: Number,
    name: String,
    position: String,
    seasonYear: Number,
    rushingYds: Number,
    tdsThrown: Number,
    sacks: Number,
    sacked: Number,
    fgsMade: Number,
    fgsMissed: Number,
    catchesMade: Number
});
// Export Players Model
var players = module.exports = mongoose.model('player', playerSchema);
module.exports.get = function (callback, limit) {
    Players.find().limit().then(function(player){
       console.log('Model: '+player);
    });
}