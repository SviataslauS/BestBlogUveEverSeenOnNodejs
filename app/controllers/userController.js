const fetch = require("node-fetch");
const md5 = require('md5');
const { UserService } = require('../services/userService');

async function getGravatarProfile(req, res) {
  const email = req.body && req.body.email;
  const emailHash = email
                      ? md5(email.trim().toLowerCase())
                      : '205e460b479e2e5b48aec07710c08d50';
  const gravatarUrl = `http://www.gravatar.com/${emailHash}.json`;

  const response = await fetch(gravatarUrl, {
    method: "GET",
    headers: {
      headers: {
        'User-Agent': 'Mozilla/5.0'
      }
    },
  });

  const messageData = await response.json();

  if ((response.status !== 200) && (response.status !== 201)) {
    console.error(`Invalid response status ${ response.status }.`);
    res.status(500).end();
    throw messageData;
  }

  res.json(messageData);
}

async function getAllUsers(req, res) {
  const result = await UserService.getAll();
  res.json(result);
}

async function getUserById(req, res) {
  const id = req.swagger.params.id.value;
  const result = await UserService.getEntityById(id);
  res.json(result);
} 

async function createUser(req, res) {
  const body = req.body;
  const result = await UserService.create(body);
  res.json(result);
} 

async function updateUser(req, res) {
  const postId = req.swagger.params.postId.value;
  const body = req.body;
  await UserService.update(postId, body);
  res.status(200).end();
}

async function deleteUser(req, res) {
  const postId = req.swagger.params.postId.value;
  await UserService.delete(postId);
  res.status(200).end();
} 

module.exports = {
  getGravatarProfile,
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};