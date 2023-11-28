const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const IssueSchema = new Schema({
  content: {
    type: String,
    default: " ",
  },
  category: {
    type: String,
    enum: ["Network Issue", "Software Issue", "Hardware Issue"],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  keyWords: [String],
});

const Issue = mongoose.model("knowledgeBase", IssueSchema);

module.exports = Issue;
