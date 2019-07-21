const fs = require('fs');
const _ = require('lodash');

class Repository {
    static getAllPosts() {      
      const appRoot = process.cwd();
      const filePath = appRoot + '/app/storage.json';
      const storage = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      const posts = _.map(storage.posts, function(item){
        item.creationDate = new Date(item.creationDate, );
        return item;
      });
  
      return posts;
    }
  }
  
  module.exports = Repository;
  
  