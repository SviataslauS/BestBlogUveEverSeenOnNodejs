const fs = require('fs');
const path = require('path');


const filePath = path.join(__dirname, '../storage.json');

class Repository {
  constructor(entityModel) {
    this.model = entityModel;
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

  async getAll() {
    const users = await this.model.find({});
    return users;
  }

  getByIdFromArray(id, entities) {
    const entity = entities.find(entity => entity.id == id);
    if(!entity) {
      throw Error(`${this.entityName} entity with id=${id} not found`);
    }

    return entity;
  }
  
  async getById(id) {
    const users = await this.model.findById(id);
    return users;
  }
  
  create(entity) {
    this.model.create(entity);
    let entities = this.getAll() || [];
    let maxExistingId = Math.max(entities.map(e => e.id));
    entity.id = ++maxExistingId;
    entity.creationDate = Repository.formatDate(new Date());
    entities.push(entity);
    this.save(entities);

    return entity;
  }

  update(id, entity) {
    const entities = this.getAll();
    let oldEntity = this.getByIdFromArray(id, entities);
    Object.assign(oldEntity, entity);
    this.save(entities);
  }

  delete(id) {
    let entities = this.getAll();
    const newEntities = entities.filter(e => e.id != id);
    this.save(newEntities);
  }

  static formatDate(date) {
    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = date.getFullYear();

    return `${mm}/${dd}/${yyyy}`;
  }

}

 module.exports = Repository;
  
  