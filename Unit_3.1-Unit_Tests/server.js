var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var stormpath = require('stormpath');
var app = express();
var morgan = require('morgan');
var routes = require("./app/routes");
var db	 = require('./config/db');
//var security = require('./config/security');

app.use(morgan('dev'));
//app.use(stormpath.init(app, {
//    apiKeyFile: './config/stormpath_apikey.properties',
//    application: 'YOUR SP APPLICATION URL',
//    secretKey: security.stormpath_secret_key
//}));
var port = 8081;

const mongo = mongoose.connect(db.url);
mongo.then(() => {
    console.log('connected');
}, error => {
    console.log(error, 'error');
});


app.use(bodyParser.urlencoded({ extended: true }));
routes.addAPIRouter(app, mongoose, stormpath);


app.use(function(req, res, next){
   res.status(404);
   res.json({ error: 'Invalid URL' });
});

app.listen(port);

console.log('Magic happens on port ' + port);
exports = module.exports = app;