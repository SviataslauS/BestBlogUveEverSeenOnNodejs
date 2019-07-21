const PostService = require('../services/postService');
const { permissions } = require('../utils/enums');

const actionPermissions = {
  getStatistic: permissions.VIEW_PHOTOS
};

const paths = {
  getAllPosts: '/posts'
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
}

module.exports = PostsController;