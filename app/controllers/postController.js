const PostService = require('../services/postService');
const { permissions } = require('../utils/enums');

const actionPermissions = {
  getStatistic: permissions.VIEW_PHOTOS
};

const paths = {
  getAllPosts: '/posts',
  getPostById: '/posts/:postId'
};

class PostsController {
  static get paths() {
      return paths;
  }
  
  static get permissions() {
      return actionPermissions;
  }
  
  static getStatistic(req, res) {
    const result = PostService.getStatistic();
    res.json(result);
  }

  static getAllPosts(req, res) {
    const result = PostService.getAllPosts();
    res.json(result);
  } 

  static getPostById(req, res) {
    const postId = req.params.postId;
    const result = PostService.getPostById(postId);
    res.json(result);
  } 

  static updatePost(req, res) {
    PostService.updatePost();
    res.status(200).end();
  }
  
  static deletePost(req, res) {
    PostService.deletePost();
    res.status(200).end();
  } 

}

module.exports = PostsController;