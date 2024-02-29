/*
    Written by: Lukas Myers
    Date: 1-28-2024
    Class: CSC 560 Applied Restful APis
    Project: Unit 3.1 - Unit Tests
*/

let express = require('express')
let app = express();
let cors = require("cors");
var port = process.env.PORT || 8081;

app.use(express.json());    // needed for req.body == undefined
app.use(express.urlencoded());   // this one works !!!
app.use(cors());

//Import routes
let apiRoutes = require("./routes")
//Use API routes in the App
app.use('/api', apiRoutes)
//import body parser
let bodyParser = require('body-parser');
//import mongoose
let mongoose = require('mongoose');

//configure bodyparser to hande the post requests
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// Welcome message
app.get('/', (req, res) => res.send('Welcome to Express'));
// Launch app to the specified port
app.listen(port, function() {
    console.log("Running First Rest on Port "+ port);
});

//connect to mongoose
const dbPath = 'mongodb://127.0.0.1:27017/test';
//const options = {useNewUrlParser: true, useUnifiedTopology: true}
const mongo = mongoose.connect(dbPath);
mongo.then(() => {
    console.log('connected');
}, error => {
    console.log(error, 'error');
});
var db=mongoose.connection;

//Check DB Connection
if (!db)
    console.log("Error connecting db");
else
    console.log("DB Connected Successfully");