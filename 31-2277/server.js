var app = require('./app');
var http = require('http');
var db = require('./db');
var quote = require("./quotes");
 db.connect(function(db){
 	quote.seed(function(seed_){
 		app.listen(3000,function(){
	console.log('we are connected');
});
 	})
 });