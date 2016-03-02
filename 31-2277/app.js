var express = require("express");
var path = require("path");
//var db = require("./db");
var app = express();
var quote = require("./quotes");

 app.use(express.static(path.join(__dirname, 'public')));



 app.get('/',function(req,res){
 	res.render("public/index.html");
 });

 app.get('/api/quote',function(req,res){
 	quote.getQuoteFromDB(function(err,quote_){
 		res.json(quote_);
 	});
 });

  app.get('/api/quotes',function(req,res){
 	quote.getQuotesFromDB(function(err,quotes){
 		res.json(quotes);
 	});
 });
 module.exports=app;

