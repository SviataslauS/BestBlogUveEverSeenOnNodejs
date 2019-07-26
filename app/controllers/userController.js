const fetch = require("node-fetch");
const md5 = require('md5');


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


module.exports = {
  getGravatarProfile,
};