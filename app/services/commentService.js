const EntityService = require('./entityService');
const Comment = require('../repository/models/commentModel');

class CommentService extends EntityService {
  constructor(){
    super(Comment);
  }

  async getComment(postId, commentId) {
    const conditions = {postId, _id: commentId };
    return this.repository.findOne(conditions);
  }
}

module.exports = { CommentService: new CommentService() };

