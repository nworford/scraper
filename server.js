var express = require("express");
var mongojs = require("mongojs");
// Require request and cheerio. This makes the scraping possible
var request = require("request");
var cheerio = require("cheerio");
var handlebarsExpress = require("express-handlebars");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");