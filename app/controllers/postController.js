const fs = require('fs');
const _ = require('lodash');
const PostService = require('../services/postService');

class PostsController {
  static getStatistic(req, res) {
    const result = PostService.getStatistic();
    res.json(result);
  }
}

module.exports = PostsController;