const { CommentService } = require('../services/commentService');


async function getAllComments(req, res) {
  const result = await CommentService.getAll();
  res.json(result);
}

async function getComment(req, res) {
  const commentId = req.swagger.params.commentId.value;
  const postId = req.swagger.params.postId.value;
  const result = await CommentService.getComment(postId, commentId);
  res.json(result);
} 

async function addComment(req, res) {
  const body = req.body;
  const result = await CommentService.create(body);
  res.json(result);
} 

async function updateComment(req, res) {
  const commentId = req.swagger.params.commentId.value;
  const body = req.body;
  await CommentService.update(commentId, body);
  res.status(200).end();
}

async function deleteComment(req, res) {
  const commentId = req.swagger.params.commentId.value;
  await CommentService.delete(commentId);
  res.status(200).end();
} 


module.exports = {
  getAllComments,
  getComment,
  addComment,
  updateComment,
  deleteComment,
};