// const { getById } = require('../repository/storage');
const { entities } = require('../utils/enums');
const EntityService = require('../services/entityService');
const User = require('../repository/models/userModel');
  
class UserService extends EntityService {
    constructor(){
      super(entities.users);
    }
    
    getUserById(id) {
      const qwe = User.findById(id, (error, user) => {
        console.log(`cb`);
        console.log(`error: ${error}`);
        console.log(`user:`);
        console.log(user);
      })
        .then(() => {
        console.log(`then`);
      });
  // const eee = qwe.lean();
  console.log('********************UserService');
  console.log(qwe);
     return qwe;
    }
    
    async getAllUsers() {
      const User = require('../repository/models/userModel');
      // const User = mongoose.model('User');
      const users = await User.find({});
      // , function(err, users) {
      //   var userMap = {};

      //   users.forEach(function(user) {
      //     userMap[user._id] = user;
      //   });

      //   res.send(userMap);  
      // }).catch((e) => {
      //   res.send(e);
      // });
      return users;
    }
}

// const entity = getById(id, User, (r, u) => {
//   console.log('********************UserService');
//   console.log(r);
//   console.log(u);
// });
// return entity;

module.exports = { UserService: new UserService() };
