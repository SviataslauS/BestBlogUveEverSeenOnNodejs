const Repository = require('../repository/repository');

class EntityService {
    constructor(entityName) {
        this.repository = new Repository(entityName);
    }

    getAll() {
        const entities = this.repository.getAll();
        return entities;
    }

    getEntityById(id) {
        const entity = this.repository.getById(id);
        return entity;
    }

    create(entity) {
        return this.repository.create(entity);
    }

    update(id, entity) {
        return this.repository.update(id, entity);
    }

    delete(id) {
        this.repository.delete(id);
    }
}


module.exports = EntityService;
