// mediaController.js
// Import media Model
Media = require('./mediaModel');

// For index
exports.index = async function (req, res) {
    try {
        let message = "";
        const mediaFound = await Media.find({}).sort({Title:1}).collation({locale:"en", caseLevel:true});
        if (mediaFound != null) {
            console.log("All Media Listed");
            //console.log(mediaFound);
            message = "All Media Details"
        } else {
            console.log("No media found");
            message = "No media Found";
        }
        res.json({
            message: message,
            data: mediaFound
        });
      } catch (err) {
        console.log(err);
      };
};

//For creating new media
exports.add = function (req, res) {
    var media = new Media();
    //console.log('This is my model ---', req.body);
    media.Title = req.body.Title;
    media.Year = req.body.Year;
    media.Rated = req.body.Rated;
    media.Released = req.body.Released;
    media.Runtime = req.body.Runtime;
    media.Genre = req.body.Genre;
    media.Plot = req.body.Plot;
    media.Poster = req.body.Poster;
    media.Metascore = req.body.Metascore;
    media.imdbRating = req.body.imdbRating;
    media.imdbVotes = req.body.imdbVotes;
    media.imdbID = req.body.imdbID;
    media.Type = req.body.Type;
    media.watched = req.body.watched;
    media.myRating = req.body.myRating;
//Save and check error
    media.save().then(()=>{
        console.log("New media Added: "+media.Title);
        res.json({
            message: "New media "+media.Title+" Added!",
            data: media
        });
    }).catch((err)=>{
        console.log(err);
    })
};

// View media
exports.view = async function (req, res) {
    try {
        let message = "";
        const mediaFound = await Media.findById(req.params.mediaId);
        if (mediaFound != null) {
            console.log("Media Found: "+mediaFound.Title);
            //console.log(mediaFound);
            message = mediaFound.Title+" media Details"
        } else {
            console.log("No media found with ID: "+req.params.mediaId);
            message = "No media Found";
        }
        res.json({
            message: message,
            data: mediaFound
        });
      } catch (err) {
        console.log(err);
      }
};

// Update media
exports.update = async function (req, res) {
    try {
        let message = "";
        let mediaSave = null;
        const mediaUpdate = await Media.findById(req.params.mediaId);
        if (mediaUpdate != null) {
            mediaUpdate.Title = req.body.Title=='undefined'?'':req.body.Title;
            mediaUpdate.Year = req.body.Year=='undefined'?'':req.body.Year;
            mediaUpdate.Rated = req.body.Rated=='undefined'?'':req.body.Rated;
            mediaUpdate.Released = req.body.Released=='undefined'?'':req.body.Released;
            mediaUpdate.Runtime = req.body.Runtime=='undefined'?'':req.body.Runtime;
            mediaUpdate.Genre = req.body.Genre=='undefined'?'':req.body.Genre;
            mediaUpdate.Plot = req.body.Plot=='undefined'?'':req.body.Plot;
            mediaUpdate.Poster = req.body.Poster=='undefined'?'':req.body.Poster;
            mediaUpdate.Metascore = req.body.Metascore=='undefined'?'':req.body.Metascore;
            mediaUpdate.imdbRating = req.body.imdbRating=='undefined'?'':req.body.imdbRating;
            mediaUpdate.imdbVotes = req.body.imdbVotes=='undefined'?'':req.body.imdbVotes;
            mediaUpdate.imdbID = req.body.imdbID=='undefined'?'':req.body.imdbID;
            mediaUpdate.Type = req.body.Type=='undefined'?'':req.body.Type;
            mediaUpdate.watched = req.body.watched=='undefined'?0:req.body.watched;
            mediaUpdate.myRating = req.body.myRating=='undefined'?0:req.body.myRating;
        //save and check errors
            mediaSave = await mediaUpdate.save();
            console.log("Media Updated: "+mediaUpdate.Title);
            //console.log(mediaSave);
            message = "Media "+mediaUpdate.Title+" Updated Successfully";
        } else {
            console.log("Media Not Found with ID: "+req.params.mediaId);
            message = "Media Not Found";
            mediaSave = mediaUpdate;
        }
        res.json({
            message: message,
            data: mediaSave
        });
    } catch (err) {
        console.log(err);
    }    

};

// Delete user
exports.delete = async function (req, res) {
    try {
        const mediaDelete = await Media.deleteOne({_id:req.params.mediaId});
        console.log("Media Deleted with ID: "+req.params.mediaId);
        //console.log(mediaDelete);
        res.json({
            status: "success",
            message: "Media Deleted",
            data: mediaDelete
        });
      } catch (err) {
        console.log(err);
      }
};


// movies - newest to oldest
exports.moviesNew2Old = async function (req, res) {
    try {
        console.log("QUERY: Movies Newest to Oldest");
        const media = await Media.find({Type:'movie'}).sort({Year:-1});
        res.json({ media });
    } catch (err) {
        console.log(err);
    }
};

//movies - rating high to low
exports.moviesRatingHigh2Low = async function (req, res) {
    try {
        console.log("QUERY: Movies Rating Highest to Lowest");
        const media = await Media.find({Type:'movie'}).sort({imdbRating:-1});
        res.json({ media });
    } catch (err) {
        console.log(err);
    }
};

//media - watched my ratings high to low
exports.watchedMyRatingsHigh2Low = async function (req, res) {
    try {
        console.log("QUERY: My Watched Ratings Highest to Lowest");
        const media = await Media.find({watched:1}).sort({myRating:-1});
        res.json({ media });
    } catch (err) {
        console.log(err);
    }
};

// media - most voted
exports.mediaMostVoted = async function (req, res) {
    try {
        console.log("QUERY: Media Most IMDB Voted");
        const media = await Media.find({}).sort({imdbVotes:-1}).limit(1);
        res.json({ media });
    } catch (err) {
        console.log(err);
    }
};

// series - rating high to low
exports.seriesRatingHigh2Low = async function (req, res) {
    try {
        console.log("QUERY: Series Rating Highest to Lowest");
        const media = await Media.find({Type:'series'}).sort({imdbRating:-1});
        res.json({ media });
    } catch (err) {
        console.log(err);
    }
};