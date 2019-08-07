const Storage = require('../repository/storage');
const { entities } = require('../utils/enums');
const EntityService = require('../services/entityService');
const User = require('../repository/models/userModel');
  
class UserService extends EntityService {
    constructor(){
      super(entities.users);
      this.repository = new Storage(User);
    }
  }

module.exports = { UserService: new UserService() };
