const { PostService } = require('../services/postService');
const { withAuthorization } = require('../middlewares/authorizationMiddleware');
const { permissions } = require('../utils/enums');


function getAllPosts(req, res) {
  const result = PostService.getAll();
  res.json(result);
}

function getPostById(req, res) {
  const postId = req.swagger.params.postId.value;
  const result = PostService.getEntityById(postId);
  res.json(result);
} 

function createPost(req, res) {
  const body = req.body;
  const result = PostService.create(body);
  res.json(result);
} 

function updatePost(req, res) {
  const postId = req.swagger.params.postId.value;
  const body = req.body;
  PostService.update(postId, body);
  res.status(200).end();
}

function deletePost(req, res) {
  const postId = req.swagger.params.postId.value;
  PostService.delete(postId);
  res.status(200).end();
} 

function getStatistic(req, res) {
  console.log('Postjs');
  const result = PostService.getStatistic();
  res.json(result);
}

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  getStatistic: withAuthorization(getStatistic, permissions.VIEW_STATISTIC),
};