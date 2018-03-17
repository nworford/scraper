var express = require("express");
var expressHandlebars = require("express-handlebars");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var cheerio = require("cheerio");
var request = require("request");


var app = express();

var databaseUrl = "scraper";
var collections = ["scrapedData"];

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, {

});

var db = require("./models");

var PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("views"));

mongoose.connect("mongodb://localhost/webscraper", {
  useMongoClient: true
});

app.get("/scrape", function(req, res) {

    //localhost:3000/scrape here
    request("https://www.nytimes.com/", function(error, response, body) {
        if(error){
            throw error;
        }
        var $ = cheerio.load(body);
        var articles = []
        $("article h2.story-heading").each(function(i, el){
            var article = {};
            var a = $(this).find("a");
            article.headline = $(a).text();
            article.link = $(a).attr("href");
            var p = $(this).next("p.summary");
            article.summary = $(p).text();
            articles.push(article);
        })
        console.log(articles);
    });
});