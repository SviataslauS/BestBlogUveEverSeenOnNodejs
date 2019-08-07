const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  name: { type: String, required: true },
  creationDate: { type: Date, default: Date.now },
});
const Post = mongoose.model('Post', postSchema);
module.exports = Post;