const PostService = require('../services/postService');
const { permissions } = require('../utils/enums');

const actionPermissions = {
  getStatistic: permissions.VIEW_PHOTOS
};

class PostsController {
  static get permissions() {
      return actionPermissions;
  }
  
  static getStatistic(req, res) {
    const result = PostService.getStatistic();
    res.json(result);
  }
}

module.exports = PostsController;