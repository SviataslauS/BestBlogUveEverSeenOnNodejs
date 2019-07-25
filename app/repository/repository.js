const fs = require('fs');
const _ = require('lodash');


const appRoot = process.cwd();
const filePath = appRoot + '/app/storage.json';

class Repository {
  constructor(entityName) {
    this.entityName = entityName;
  }
  
  static get storage() { 
    const storage = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    return storage;
  }

  static writeStorage(store) {
    const json = JSON.stringify(store);
    fs.writeFileSync(filePath, json, 'utf8');
  }

  save(entities) {
    let store = Repository.storage;
    store[this.entityName] = entities;
    Repository.writeStorage(store);
  }

  getAll() {
    return Repository.storage[this.entityName];
  }

  getById(id) {      
    const entity = _.filter(this.getAll(), entity => entity.id == id);
    return entity;
  }
  
  create(entity) {
    let entities = this.getAll();
    const maxExistingId = Math.max(entities.map(e => e.id));
    entity.id = maxExistingId;
    entities.push(entity);
    this.save(entities);

    return entity;
  }

  update(id, entity) {
    let entities = this.getAll();
    let oldEntity = entities.find(e => e.id == id);
    Object.assign(oldEntity, entity);
    this.save(entities);
  }

  delete(id) {
    let entities = this.getAll();
    const newEntities = entities.filter(e => e.id != id);
    this.save(newEntities);
  }

}

 module.exports = Repository;
  
  