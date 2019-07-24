const {HealthController} = require('../controllers/healthController');
const { LoginController, authCookieName } = require('../controllers/loginController');
const _ = require('lodash');

const nonSecurePaths = [
        '/api',
        '/api/',
        '/',
        HealthController.paths.ping,
        LoginController.paths.login,
        LoginController.paths.logout,
    ];

function authMiddleware (req, res, next) {
    if ( _.includes(nonSecurePaths, req.originalUrl) ) {
        return next();
    }
    
    const authCookie = (req.cookies)[authCookieName];
    return authCookie
            ? next()
            : res.status(401).send('Unauthorized');
}

module.exports = { authMiddleware, authCookieName };