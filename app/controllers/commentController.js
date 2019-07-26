const { CommentService } = require('../services/commentService');


function getAllComments(req, res) {
  const result = CommentService.getAll();
  res.json(result);
}

function getComment(req, res) {
  const commentId = req.swagger.params.commentId.value;
  const postId = req.swagger.params.postId.value;
  const result = CommentService.getComment(postId, commentId);
  res.json(result);
} 

function addComment(req, res) {
  const body = req.body;
  const result = CommentService.create(body);
  res.json(result);
} 

function updateComment(req, res) {
  const commentId = req.swagger.params.commentId.value;
  const body = req.body;
  CommentService.update(commentId, body);
  res.status(200).end();
}

function deleteComment(req, res) {
  const commentId = req.swagger.params.commentId.value;
  CommentService.delete(commentId);
  res.status(200).end();
} 


module.exports = {
  getAllComments,
  getComment,
  addComment,
  updateComment,
  deleteComment,
};