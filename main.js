// server.js
// where your node app starts

// init project
var express = require('express');
var helmet = require('helmet');
var bodyParser = require('body-parser');
var app = express();
var Gun = require('gun');
// Must be added after Gun but before instantiating Gun
require('gun-mongo');

require('dotenv').config();
var PORT = process.env.PORT || 8080;

// set the view engine to ejs
app.set('view engine', 'ejs');

app.use(helmet());
app.use(helmet.noCache());

//https://enable-cors.org/server_expressjs.html
app.use(function(req, res, next) {
    //deal with img-src access and other for dev builds.
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(Gun.serve);
app.use(bodyParser.urlencoded({ extended: true }));

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// init sqlite db
var fs = require('fs');
//var dbFile = './.data/sqlite.db';
var dbFile = process.env.DatabaseFile;// './.data/data.json';
console.log("database path:", process.env.DatabaseFile);
var exists = fs.existsSync(dbFile);
// if ./.data/sqlite.db does not exist, create it, otherwise print records to console
if(!exists){
  console.log("file not exist!");
}else{
  console.log("file exist!");
}

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  //response.sendFile(__dirname + '/views/index.html');
  response.render('index');
});

// listen for requests :)
var listener = app.listen(PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
  //http://localhost:3000/
  //console.log(listener.address());
});

function gunget(request){
  console.log('gunget');
  //var at = this.as, to = this.to;
  //if(msg.get){
  //}
  return this.to.next(request);
}

function gunput(request){
  console.log('gunput');
  return this.to.next(request);
}
//this will listen to get and put function calls to see if data is update here.
Gun.on('opt', function(db){
  //if(!at.token){ // only add SEA once per instance, on the "at" context.
  db.on('get', gunget); // now listen to all input data, acting as a firewall.
  db.on('put', gunput); // and output listeners, to encrypt outgoing data.
  //}
  this.to.next(db); // make sure to call the "next" middleware adapter.
});

//boolean for database for mongodb
//current disable for simple testing.
var bdatabase = false;

var gunconfig = {
  web:listener //server express
}

if(bdatabase){
  gunconfig.localStorage = false;
  gunconfig.radisk = false; //that will trigger the next default to run: RAD (Radix Storage Engine)
  gunconfig.mongo = {
    host: 'localhost',
    port: '27017',
    database: 'gun',
    collection: 'gun-mongo',
    query: ''
  }
}
//var gun = Gun({
  //web:listener, //server express
//});
//create gun database
var gun = Gun(gunconfig);
//init database save
gun.get('data').once(function(){});
//note data.json is default file
