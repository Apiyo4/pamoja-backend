const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    comment: { type: String, required: true },
    username: { type: String, required: true },
    userAvatar: { type: String, required: true }
  });

module.exports = mongoose.model("Comment", commentSchema);