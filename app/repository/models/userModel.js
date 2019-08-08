const mongoose = require('mongoose');
const { entities } = require('../../utils/enums');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
});
const User = mongoose.model(entities.User, userSchema);
module.exports = User;