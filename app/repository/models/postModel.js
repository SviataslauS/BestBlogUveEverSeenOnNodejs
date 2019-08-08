const mongoose = require('mongoose');
const { entities } = require('../../utils/enums');

const postSchema = new mongoose.Schema({
  name: { type: String, required: true },
  creationDate: { type: Date, default: Date.now },
});
const Post = mongoose.model(entities.Post, postSchema);
module.exports = Post;