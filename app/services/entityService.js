const Repository = require('../repository/repository');

class EntityService {
    constructor(entityName) {
        this.repository = new Repository(entityName);
    }

    getAll() {
        return this.repository.getAll();
    }

    getEntityById(id) {
        const entity = this.repository.getById(id);
        return entity;
    }

    getByIdFromArray(id, entities) {
        const entity = this.repository.getByIdFromArray(id, entities);
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
