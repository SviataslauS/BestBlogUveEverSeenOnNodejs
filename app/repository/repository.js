const fs = require('fs');
const path = require('path');


const filePath = path.join(__dirname, '../storage.json');

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
    const store = Repository.storage;
    store[this.entityName] = entities;
    Repository.writeStorage(store);
  }

  getAll() {
    return Repository.storage[this.entityName];
  }

  getByIdFromArray(id, entities) {
    const entity = entities.find(entity => entity.id == id);
    if(!entity) {
      throw Error(`${this.entityName} entity with id=${id} not found`);
    }

    return entity;
  }
  
  getById(id) {
    const allEntities = this.getAll();
    return this.getByIdFromArray(id, allEntities);
  }
  
  create(entity) {
    const entities = this.getAll() || [];
    let maxExistingId = Math.max(entities.map(e => e.id));
    entity.id = ++maxExistingId;
    entity.creationDate = Repository.formatDate(new Date());
    entities.push(entity);
    this.save(entities);

    return entity;
  }

  update(id, entity) {
    const entities = this.getAll();
    const oldEntity = this.getByIdFromArray(id, entities);
    Object.assign(oldEntity, entity);
    this.save(entities);
  }

  delete(id) {
    const entities = this.getAll();
    const newEntities = entities.filter(e => e.id != id);
    this.save(newEntities);
  }

  static formatDate(date) {
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = date.getFullYear();

    return `${mm}/${dd}/${yyyy}`;
  }

}

 module.exports = Repository;
  
  