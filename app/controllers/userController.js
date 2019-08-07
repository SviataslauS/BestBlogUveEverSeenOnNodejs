const fetch = require("node-fetch");
const md5 = require('md5');
const { UserService } = require('../services/userService');
const dbHelper = require('../utils/dbHelper');
const mongoose = require('mongoose');


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

async function getUserById(req, res) {
  const id = req.swagger.params.id.value;
  const result = await UserService.getUserById(id);
  res.json(result);
} 

async function getAllUsers(req, res) {
  const result = await UserService.getAllUsers();
  res.json(result);
}

module.exports = {
  getGravatarProfile,
  getUserById,
  getAllUsers,
};