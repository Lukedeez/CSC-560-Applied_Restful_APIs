/*
   Written by: Lukas Myers
   Date:       1-8-2024
   Course:     CSC560 Applied RESTful APIs
   Instructor: Dr. Michael Litman
   Program:    MEAN stack end point generation
*/

// variables
var express = require('express');
var app = express();
var fs = require("fs");

app.use(express.static('public'));
//app.get('/index.html', function (req, res) {
//   res.sendFile( __dirname + "/" + "index.html" );
//})

// user to be added
var user = {
   "user4" : {
      "name" : "mohit",
      "password" : "password4",
      "profession" : "teacher",
      "id": 4
   }
}


// add user
app.post('/addUser', function (req, res) {
   // First read existing users.
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
      data = JSON.parse( data );
      data["user4"] = user["user4"];
      console.log( data );
      res.end( JSON.stringify(data));
   });
})


// show all users
app.get('/listUsers', function (req, res) {
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
      console.log( data );
      res.end( data );
   });
})


// user detail by id
app.get('/:id', function (req, res) {
   // First read existing users.
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
      var users = JSON.parse( data );
      var user = users["user" + req.params.id] 
      console.log( user );
      res.end( JSON.stringify(user));
   });
})


// delete
var id = 2;
app.delete('/deleteUser', function (req, res) {
   // First read existing users.
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
      data = JSON.parse( data );
      delete data["user" + 2];
      console.log( data );
      res.end( JSON.stringify(data));
   });
})


// start server
var server = app.listen(8081, function () {
   var host = server.address().address;
   var port = server.address().port;
   console.log("Server Started on port: "+port+"\nWritten by: Lukas Myers\nCourse: CSC560 Applied RESTful APIs\nInstructor: Dr. Michael Litman\nProgram: MEAN stack end point generation");
})