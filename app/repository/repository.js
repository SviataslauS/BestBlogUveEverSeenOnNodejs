const fs = require('fs');
const _ = require('lodash');


const getStorage = () => { 
  const appRoot = process.cwd();
  const filePath = appRoot + '/app/storage.json';
  const storage = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  return storage;
};

class Repository {
  constructor(entityName) {
    this.entityName = entityName;
  }
  
  getAll() {
    const entities = _.map(getStorage()[this.entityName], function(item){
      item.creationDate = new Date(item.creationDate);
      return item;
    });

    return entities;
  }

  getById(id) {      
    const entity = _.filter(this.getAll(), entity => entity.id == id);
    return entity;
  }

}

 module.exports = Repository;
  
  