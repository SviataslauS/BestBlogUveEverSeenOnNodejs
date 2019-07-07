var fs = require('fs');
var _ = require('lodash');
var PostService = require('../services/postService');

class PostsController {
  static getStatistic(req, res) {
    var result = PostService.getStatistic();
    res.json(result);
  }
}

module.exports = PostsController;