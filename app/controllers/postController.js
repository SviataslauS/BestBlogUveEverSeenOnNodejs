const { PostService } = require('../services/postService');
const { withAuthorization } = require('../middlewares/authorizationMiddleware');
const { permissions } = require('../utils/enums');


async function getAllPosts(req, res) {
  const result = await PostService.getAll();
  res.json(result);
}

async function getPostById(req, res) {
  const postId = req.swagger.params.postId.value;
  const result = await PostService.getEntityById(postId);
  res.json(result);
} 

async function createPost(req, res) {
  const body = req.body;
  const result = await PostService.create(body);
  res.json(result);
} 

async function updatePost(req, res) {
  const postId = req.swagger.params.postId.value;
  const body = req.body;
  await PostService.update(postId, body);
  res.status(200).end();
}

async function deletePost(req, res) {
  const postId = req.swagger.params.postId.value;
  await PostService.delete(postId);
  res.status(200).end();
} 

async function getStatistic(req, res) {
  const result = await PostService.getStatistic();
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