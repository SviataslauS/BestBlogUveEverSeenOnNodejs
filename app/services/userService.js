const EntityService = require('../services/entityService');
const User = require('../repository/models/userModel');
  
class UserService extends EntityService {
    constructor(){
      super(User);
    }
  }

module.exports = { UserService: new UserService() };
