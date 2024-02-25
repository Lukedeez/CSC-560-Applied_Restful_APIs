// playerController.js
// Import player Model
Players = require('./playerModel');

// For index
exports.index = function (req, res) {
    Players.find().then((players)=>{
        console.log("All Players Listed");
        res.json({
            message: "All Players Details",
            data: players
        });
    }).catch((err)=>{
        console.log(err);
    });
};

//For creating new player
exports.add = function (req, res) {
    var player = new Players();
    //console.log('This is my model ---', req.body);
    player.jerseyNumber = req.body.jerseyNumber;
    player.name = req.body.name ? req.body.name : player.name;
    player.position = req.body.position;
    player.seasonYear = req.body.seasonYear;
    player.rushingYards = req.body.rushingYards;
    player.touchdownsThrown = req.body.tocuhdownsThrown;
    player.sacks = req.body.sacks;
    player.sacked = req.body.sacked;
    player.fieldGoalsMade = req.body.fieldGoalsMade;
    player.fieldGoalsMissed = req.body.fieldGoalsMissed;
    player.catchesMade = req.body.catchesMade;
//Save and check error
    player.save().then(()=>{
        console.log("New Player Added");
        res.json({
            message: "New Player "+player.name+" Added!",
            data: player
        });
    }).catch((err)=>{
        console.log(err);
    })
};

// View Player
exports.view = async function (req, res) {
    try {
        let message = "";
        const playerFound = await Players.findById(req.params.player_id);
        if (playerFound != null) {
            console.log("Player Found:");
            console.log(playerFound);
            message = playerFound.name+" Player Details"
        } else {
            console.log("No player found with ID: "+req.params.player_id);
            message = "No Player Found";
        }
        res.json({
            message: message,
            data: playerFound
        });
      } catch (err) {
        console.log(err);
      }
};

// Update Players
exports.update = async function (req, res) {
    try {
        let message = "";
        let playerSave = null;
        const playerUpdate = await Players.findById(req.params.player_id);
        if (playerUpdate != null) {
            playerUpdate.jerseyNumber = req.body.jerseyNumber;
            playerUpdate.name = req.body.name ? req.body.name : playerUpdate.name;
            playerUpdate.position = req.body.position;
            playerUpdate.seasonYear = req.body.seasonYear;
            playerUpdate.rushingYards = req.body.rushingYards;
            playerUpdate.touchdownsThrown = req.body.touchdownsThrown == 'undefined' ? 0 : req.body.touchdownsThrown;
            playerUpdate.sacks = req.body.sacks == 'undefined' ? 0 : req.body.sacks;
            playerUpdate.sacked = req.body.sacked == 'undefined' ? 0 : req.body.sacked;
            playerUpdate.fieldGoalsMade = req.body.fieldGoalsMade;
            playerUpdate.fieldGoalsMissed = req.body.fieldGoalsMissed;
            playerUpdate.catchesMade = req.body.catchesMade == 'undefined' ? 0 : req.body.catchesMade;
        //save and check errors
            playerSave = await playerUpdate.save();
            console.log("Player Updated:");
            console.log(playerSave);
            message = "Player "+playerSave.name+" Updated Successfully";
        } else {
            console.log("Player Not Found with ID: "+req.params.player_id);
            message = "Player Not Found";
            playerSave = playerUpdate;
        }
        res.json({
            message: message,
            data: playerSave
        });
    } catch (err) {
        console.log(err);
    }    

};

// Delete player
exports.delete = async function (req, res) {
    try {
        const playerDelete = await Players.deleteOne({_id:req.params.player_id});
        console.log("Player Deleted");
        console.log(playerDelete);
        res.json({
            status: "success",
            message: "Player Deleted",
            data: playerDelete
        });
      } catch (err) {
        console.log(err);
      }
};


// get the player with the most touchdown passes
exports.mostTDs = async function (req, res) {
    try {
        const player = await Players.findOne().sort({ 'touchdownPasses': -1 }).limit(1);
        res.json({ player });
    } catch (err) {
        console.log(err);
    }
};

// get the player with the most rushing yards
exports.mostRushYds = async function (req, res) {
    try {
        const player = await Players.findOne().sort({ 'rushingYards': -1 }).limit(1);
        res.json({ player });
    } catch (err) {
        console.log(err);
    }
};

// get the player with the least rushing yards
exports.leastRushYds = async function (req, res) {
    try {
        const player = await Players.findOne().sort({ 'rushingYards': 1 }).limit(1);
        res.json({ player });
    } catch (err) {
        console.log(err);
    }
};

// get the player with the most to least feild goals made
exports.most2LeastFGs = async function (req, res) {
    try {
        const player = await Players.find().sort({ 'fieldGoalsMade': -1 });
        res.json({ player });
    } catch (err) {
        console.log(err);
    }
};

// get the player with the most sacks
exports.mostSacks = async function (req, res) {
    try {
        const player = await Players.findOne().sort({ 'sacks': -1 }).limit(1);
        res.json({ player });
    } catch (err) {
        console.log(err);
    }
};

