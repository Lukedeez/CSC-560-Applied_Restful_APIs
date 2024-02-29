//bioModel.js
var mongoose = require('mongoose');
//schema
var mediaSchema = mongoose.Schema({
    Title: String,
    Year: String,
    Rated: String,
    Released: String,
    Runtime: String,
    Genre: String,
    Plot: String,
    Poster: String,
    Metascore: String,
    imdbRating: String,
    imdbVotes: String,
    imdbID: String,
    Type: String,
    watched: Number,
    myRating: Number
});
// Export media Model
var media = module.exports = mongoose.model('media', mediaSchema);
module.exports.get = function (callback, limit) {
    Media.find().limit().then(function(media){
       console.log('Model: '+media);
    });
}