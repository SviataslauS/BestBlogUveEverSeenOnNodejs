const mongoose = require('mongoose');
const { entities } = require('../../utils/enums');

const commentSchema = new mongoose.Schema({
    postId: { type: Number, required: true },
    text: { type: String, required: true },
    creationDate: { type: Date, default: Date.now },
});
const Comment = mongoose.model(entities.Comment, commentSchema);
module.exports = Comment;