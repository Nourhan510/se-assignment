var j = require('./quotes.json');
var DB = require('./db');

exports.getElementByIndexElseRandom = function getElementByIndexElseRandom(arr, index) {
	if(index===undefined)
		return arr[Math.floor(Math.random()*arr.length)];
	else{
    return arr[index]; 
	}
}


exports.getQuotesFromJSON=function getQuotesFromJSON(){   
   return j;
}

exports.getQuoteFromJSON= function getQuoteFromJSON(i){

		return exports.getElementByIndexElseRandom(j,i);
}

exports.seed= function seed(cb){

DB.db().collection('inspireme').find().toArray(function(err,result){
	if(result.length>0){
		cb(err, false);
	}else{
		DB.db().collection('inspireme').insertMany(j, function (err) {
			if(!err){
					cb(err, true);
			}
			else{
				cb(err, false);
			}
		});
	
	}
});
}

exports.getQuotesFromDB= function getQuotesFromDB(cb){
	DB.db().collection('inspireme').find({}).toArray(function(err,quotes){
		cb(err,quotes);
	});
}

exports.getQuoteFromDB= function getQuoteFromDB(cb,index){

    DB.db().collection('inspireme').find({}).toArray(function(err,quotes){
    	if(index===undefined)
		cb(err ,quotes[Math.floor(Math.random()*quotes.length)]);
	else{
    	cb(err,quotes[index]); 
	}
   });

}
