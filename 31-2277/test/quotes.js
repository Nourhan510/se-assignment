// tests/quotes.js

var assert = require('chai').assert;
var app = require('../app.js');
var request = require('supertest');
var Quote = require('../quotes.js');
var db = require('../db.js');

before(function(done) {
    // use this after you have completed the connect function
     db.connect(function(err, db) {
        if (err) return done(err);
        else done();
    });
});

describe("getElementByIndexElseRandom", function() {
    var arr = [1, 2, 3, 43, 5];
    it("should return a random element that is included in the array if we omit the index", function() {
        // TODO
        assert.include(arr, Quote.getElementByIndexElseRandom(arr));
    });
    it("should return the first element if we also pass the index 0", function() {
        // TODO
        assert.equal(arr[0], Quote.getElementByIndexElseRandom(arr,0));
    });
    it("should return the last element if we also pass the index", function() {
        // TODO
         assert.equal(arr[arr.length-1], Quote.getElementByIndexElseRandom(arr,arr.length-1));
    });
});

describe("getQuotesFromJSON", function() {
    it("should return an array of 102 quote", function() {
        // TODO: you know how many quotes are there
        assert.equal(102,Quote.getQuotesFromJSON().length);
    });
    it("first quote in the array's author should be Kevin Kruse", function() {
        // TODO: you know the content of first quote
        assert.deepEqual({
"author": "Kevin Kruse",
"text": "Life isn’t about getting and having, it’s about giving and being"
}, Quote.getElementByIndexElseRandom(Quote.getQuotesFromJSON(),0));
    });
});

describe("getQuoteFromJSON", function() {
    it('should return a quote object with an author and text property', function() {
        // TODO: check that the returned quote has text and author
        assert.notDeepEqual({
"author": "Kevin Kruse",
"text": "Life isn’t about getting and having, it’s about giving and being"
},Quote.getQuoteFromJSON());
    });
    it('should return a random quote if index not specified', function() {
       // TODO: is the returned quote in the all quotes array?
       assert.include(Quote.getQuotesFromJSON(),Quote.getQuoteFromJSON());
    });
    it('should return the first quote if we pass 0', function() {
        // TODO: you know the content of first quote
        assert.deepEqual({
"author": "Kevin Kruse",
"text": "Life isn’t about getting and having, it’s about giving and being"
}, Quote.getQuoteFromJSON(0));
    });
});

// quotes collection should be called quotes
describe('seed', function() {
    before(db.clearDB);
    it('should populate the db if db is empty returning true', function(done) {
        // TODO: assert that seeded is true

        Quote.seed(function (err, seeded) {
            assert.isTrue(seeded);
            done();
        });
    });
    it('should have populated the quotes collection with 102 document', function(done) {
        // TODO: check that the database contains 102 document

        db.db().collection('inspireme').find().toArray(function(err,result){

            assert.equal(102,result.length);
            done();
        });

    });
    it('should not seed db again if db is not empty returning false in the callback', function(done) {
        // TODO: assert that seeded is false
        Quote.seed(function (err, seeded) {
            assert.isFalse(seeded);
            done();
        });
    });
    it('should not seed db again if db is not empty', function(done) {
        // TODO: The database should have 102 quote still
        db.db().collection('inspireme').find().toArray(function(err,result){

            assert.equal(102,result.length);
            done();
        });
    });
});

describe('getQuotesFromDB', function() {
    it('should return all quote documents in the database', function(done) {
        // TODO: there should be 102 documents in the db
        Quote.getQuotesFromDB(function(err, quotes){
            assert.deepEqual(Quote.getQuotesFromJSON(),quotes);
            done();
        })
    });
});

describe('getQuoteFromDB', function() {
    it('should return a random quote document', function(done) {
        // TODO: see if it returns on of the quotes from all quotes
        Quote.getQuoteFromDB(function(err, quote){
            assert.include(Quote.getQuotesFromJSON(),quote);
            done();
        })
    
    });
    it('should return the first quote if passed 0 after callback', function(done) {
        // TODO: you know the content of object in the file
        Quote.getQuoteFromDB(function(err, quote){
            assert.deepEqual(Quote.getQuoteFromJSON(0),quote);
            done();
        },0)

    });
});

describe('API', function() {
    request = request(app);
    it("should return a 404 for urls that don't exist", function(done) {
         request
            .get('/api/users')
            .expect(404)
            .end(function (err, res) {
                done();
            });
    });

    it('/api/quote should return a quote JSON object with keys [_id, text, author]', function(done) {
        // TODO: test with supertest
        request
            .get('/api/quote')
            .expect(200)
            .end(function (err, res) {
                assert.isDefined(res.body._id);
                assert.isDefined(res.body.text);
                assert.isDefined(res.body.author);
                done();
            });
    });

    it('/api/quotes should return an array of JSON object when I visit', function(done) {
        // TODO: test with supertest
        request
            .get('/api/quotes')
            .expect(200)
            .end(function (err, res) {
                assert.equal(102,res.body.length);
                done();
            });
    });
});