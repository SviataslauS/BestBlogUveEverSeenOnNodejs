const Repository = require('../repository/repository');

class EntityService {
    constructor(entityModel) {
        this.repository = new Repository(entityModel);
    }

    getAll() {
        return this.repository.getAll();
    }

    getEntityById(id) {
        return this.repository.getById(id);
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
