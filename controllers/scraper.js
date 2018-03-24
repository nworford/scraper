// var express = require("express");
// // var uuid = require("uuid/v4");
// var mongoose = require("mongoose");
// var bodyParser = require("body-parser");
// // var cheerio = require("cheerio");
// var request = require("request");

// var app = express();

// var db = require("./models");

// app.enable('view cache');

// var hbs = exphbs.create({
//     defaultLayout: "main"
//  });

// app.engine('handlebars', hbs.engine);
// app.set('view engine', 'handlebars');
var Article = require("../models/Article.js");
var Note = require("../models/Note.js");

module.exports = function(app){



app.get("/", function(req, res){
    res.render("home");
});

app.post("/save-article", function(req, res){
    var article = {};
    article.id = uuid();
    article.headline = req.body.headline;
    article.link = req.body.link;
    article.summary = req.body.summary;
    
    // db.insert(article);
    // console.log(article);
    var saveArticle = new Article(article);
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

};