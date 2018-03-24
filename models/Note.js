var mongoose = require("mongoose");
var db = mongoose.createConnection("localhost:27017", "chengdu");
db.on("error", console.log);

var Schema = mongoose.Schema;

var NoteSchema = new Schema({
    // `title` is of type String
    title: String,
    // `body` is of type String
    body: String,
    articleID:String,
    id:String
  });
  // This creates our model from the above schema, using mongoose's model method
  var Note = db.model("Note", NoteSchema);
  // Export the Note model
  module.exports = Note;

  