const { entities } = require('../utils/enums');
const EntityService = require('./entityService');


class CommentService extends EntityService {
  constructor(){
    super(entities.comments);
  }

  getComment(postId, commentId) {
    const postComments = (this.getAll() || []).filter(comment => comment.postId == postId);
    if(!postComments) {
      throw Error(`${this.entityName} entity with post id = ${postId} not found`);
    }
    return this.repository.getByIdFromArray(commentId, postComments);
  }

  create(entity) {
    return super.create(entity);
  }
}

module.exports = { CommentService: new CommentService() };

