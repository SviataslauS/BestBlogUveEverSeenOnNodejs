

class Storage {
  constructor(entityModel) {
    this.model = entityModel;
  }
  
  save(entities) {
    let store = Storage.storage;
    store[this.model] = entities;
    Storage.writeStorage(store);
  }

  async getAll() {
    const users = await this.model.find({});
    return users;
  }

  getByIdFromArray(id, entities) {
    const entity = entities.find(entity => entity.id == id);
    if(!entity) {
      throw Error(`${this.model} entity with id=${id} not found`);
    }

    return entity;
  }
  
  getById(id) {
    const allEntities = this.getAll();
    return this.getByIdFromArray(id, allEntities);
  }
  
  create(entity) {
    let entities = this.getAll() || [];
    let maxExistingId = Math.max(entities.map(e => e.id));
    entity.id = ++maxExistingId;
    entity.creationDate = Storage.formatDate(new Date());
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

 module.exports = Storage;
