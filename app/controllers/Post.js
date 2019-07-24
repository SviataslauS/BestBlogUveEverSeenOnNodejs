const PostService = require('../services/postService');


function getStatistic(req, res) {
    console.log('Postjs');
    const result = PostService.getStatistic();
    res.json(result);
  }
  
  function getAllPosts(req, res) {
    const result = PostService.getAllPosts();
    res.json(result);
  } 
  

module.exports = {getStatistic, getAllPosts};