const { entities } = require('../utils/enums');
const EntityService = require('./entityService');


class CommentService extends EntityService {
  constructor(){
    super(entities.comments);
  }
}

module.exports = { CommentService: new CommentService() };

