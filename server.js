var express = require("express");
var uuid = require("uuid/v4");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var cheerio = require("cheerio");
var request = require("request");

var exphbs  = require('express-handlebars');


var app = express();

var db = require("./models");

require("./controllers/scraper.js")(app);

app.enable('view cache');

var hbs = exphbs.create({
    defaultLayout: "main"
 });

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

var Article = require("./models/Article.js");

var Note = require("./models/Note.js");

// var databaseUrl = "scraper";
// var collections = ["scrapedData"];

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/web-scraper";

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, {
    // useMongoClient: true
});

var PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + "/public"));

// mongoose.connect("mongodb://localhost/webscraper", {
  
// });

// app.get("/", function(req, res){
//     res.render("home");
// });

// app.post("/save-article", function(req, res){
//     var article = {};
//     article.id = uuid();
//     article.headline = req.body.headline;
//     article.link = req.body.link;
//     article.summary = req.body.summary;
    
//     console.log(article);
// })

// app.get("/scrape", function(req, res) {

//     //localhost:3000/scrape here
//     request("https://www.nytimes.com/", function(error, response, body) {
//         if(error){
//             throw error;
//         }
//         var $ = cheerio.load(body);
//         var articles = [];
//         $("article h2.story-heading").each(function(i, el){
//             var article = {};
//             var a = $(this).find("a");
//             article.headline = $(a).text();
//             article.link = $(a).attr("href");
//             var p = $(this).siblings("p.summary").first();
//             article.summary = $(p).text();
//             articles.push(article);
//         })
//         // res.json(articles);
//         res.render("new", {articles});
//     });
// });

app.get("/", function(req, res){
    res.render("home");
});

app.post("/save-article", function(req, res){

    var db = mongoose.connection;
    var article = {};
    article.id = uuid();
    article.headline = req.body.headline;
    article.link = req.body.link;
    article.summary = req.body.summary;
    
    
    // db.collection('articles').insert(article);
    console.log("testing");

     Article.create(article)
     .then(function(dbArticle) {
        // View the added result in the console
        console.log("working");
      })
      .catch(function(err) {
        // If an error occurred, send it to the client
        return res.json(err);
      });
    saveArticle.save(function(err){
        if(err){
            console.log(err);
        }
    });
});

app.get("/scrape", function(req, res) {

    //localhost:3000/scrape here
    request("https://www.nytimes.com/", function(error, response, body) {
        if(error){
            throw error;
        }
        var $ = cheerio.load(body);
        var articles = [];
        $("article h2.story-heading").each(function(i, el){
            var article = {};
            var a = $(this).find("a");
            article.headline = $(a).text();
            article.link = $(a).attr("href");
            var p = $(this).siblings("p.summary").first();
            article.summary = $(p).text();
            articles.push(article);
        })
        // res.json(articles);
        res.render("new", {articles});
    });
});

app.get("/getsaved", function(req, res) {

    var db = mongoose.connection;

    var articles = db.collection('articles').find(articles.headline);

    // console.log(articles);

    res.render("saved", {articles});
    //localhost:3000/scrape here
    // request("https://www.nytimes.com/", function(error, response, body) {
    //     if(error){
    //         throw error;
    //     }
    //     var $ = cheerio.load(body);
    //     var articles = [];
    //     $("article h2.story-heading").each(function(i, el){
    //         var article = {};
    //         var a = $(this).find("a");
    //         article.headline = $(a).text();
    //         article.link = $(a).attr("href");
    //         var p = $(this).siblings("p.summary").first();
    //         article.summary = $(p).text();
    //         articles.push(article);
    //     })
    //     // res.json(articles);
    //     res.render("new", {articles});
    // });
});



app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });