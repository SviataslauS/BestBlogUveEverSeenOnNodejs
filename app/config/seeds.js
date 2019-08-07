const mongoose = require('mongoose');

module.exports = () => {
  const User = require('../repository/models/userModel');

  User.collection.drop();

  User.create([{
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
};