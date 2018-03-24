var mongoose = require("mongoose");
var db = mongoose.createConnection("localhost:27017", "chengdu");
db.on("error", console.log);
var Schema = mongoose.Schema;


var ArticleSchema = new Schema({

    headline: {
        type:String,
        required:true
    },

    summary: {
        type:String,
        required:true
    },

    link: {
        type:String,
        required:true
    },

    id: {
        type:String,
        required:true
    }
});
var Article = db.model("Article", ArticleSchema);
module.exports = Article;