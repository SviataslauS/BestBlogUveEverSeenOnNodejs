
const { authCookieName } = require('../middlewares/authMiddleware');

function login (req, res) {
    let randomNumber = Math.random().toString();
    randomNumber = randomNumber.substring(2,randomNumber.length);
    const maxAge = 1 * 60 * 60 * 1000;
    res.cookie(authCookieName, randomNumber, { maxAge });
    res.status(200).end();
}

function logout (req, res) {
    res.cookie(authCookieName, 'null', { maxAge: 0, expires: new Date(0) });
    res.status(200).end();
}

module.exports = { login, logout };