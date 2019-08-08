
class Repository {
  constructor(entityModel) {
    this.model = entityModel;
  }
  
  async getAll() {
    const entities = await this.model.find({});
    return entities;
  }

  async findOne(conditions) {
    const entity = await this.model.findOne(conditions);
    return entity;
  }

  async getById(id) {
    const entity = await this.findOne({_id: id});
    return entity;
  }
  
  async create(entity) {
    entity.creationDate = Repository.formatDate(new Date());
    await this.model.create(entity);
    return entity;
  }

  async update(id, entity) {
    const newEntity = await this.model.findOneAndUpdate(id, entity);
    return newEntity;
  }

  delete(id) {
    this.model.deleteOne({ _id: id });
  }

  static formatDate(date) {
    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = date.getFullYear();

    return `${mm}/${dd}/${yyyy}`;
  }

}

 module.exports = Repository;
  
  