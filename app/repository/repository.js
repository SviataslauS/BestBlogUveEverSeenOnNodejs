const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../storage.json');

class Repository {
  constructor(entityModel) {
    this.model = entityModel;
  }
  
  async getAll() {
    const users = await this.model.find({});
    return users;
  }

  async getById(id) {
    const users = await this.model.findById(id);
    return users;
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
  
  