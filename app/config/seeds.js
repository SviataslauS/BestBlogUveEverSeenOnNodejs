const mongoose = require('mongoose');

function createUsers() {
  const User = require('../repository/models/userModel');
  User.collection.drop();

  return User.create([{
    username: 'dan123',
    email: 'dan@dan.com',
  }, {
    username: 'ben123',
    email: 'ben@ben.com',
  }])
  .then(user => {
    console.log(`${user.length} users created`);
  })
  .catch((err) => {
    console.log(err);
  });
}

function createPosts() {
  const Post = require('../repository/models/postModel');
  Post.collection.drop();

  return Post.create([{
    name: "Post number 1",
    creationDate: "07/07/2019",
  }, {
    name: "Post number 2",
    creationDate: "07/05/2019",
  }, {
    name: "Post number 3",
    creationDate: "07/03/2019",
  }, {
    name: "Post number 4",
    creationDate: "07/03/2019",
  }, {
    name: "Post number 5",
    creationDate: "06/30/2019",
  }, {
    name: "Post number 6",
    creationDate: "06/30/2018",
  }])
  .then(posts => {
    console.log(`${posts.length} posts created`);
  })
  .catch((err) => {
    console.log(err);
  });
}

const run = () => {
  createUsers()
    .then(createPosts)
    .finally(() => {
      // mongoose.connection.close();
    });  
};

module.exports = { run };