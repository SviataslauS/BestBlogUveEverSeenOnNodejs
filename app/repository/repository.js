var fs = require('fs');
var _ = require('lodash');

class Repository {
    static getAllPosts() {      
      var appRoot = process.cwd();
      var filePath = appRoot + '/app/storage.json';
      var storage = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      var posts = _.map(storage.posts, function(item){
        item.creationDate = new Date(item.creationDate, );
        return item;
      });
  
      return posts;
    }
  }
  
  module.exports = Repository;
  
  