const {HealthController} = require('../controllers/healthController');
const LoginController = require('../controllers/loginController');
const { Auth }  = require('../services/authorizationService');
const _ = require('lodash');

const nonSecurePaths = ['/', HealthController.paths.ping,  LoginController.paths.login];

function authMiddleware (req, res, next) {
    if ( _.includes(nonSecurePaths, req.path) ) {
        return next();
    }
    
    const user = { 'email': 'test@qwe.qwe'}; //getCurrentUser()
    const isAllowed = Auth.checkUserPermission("permissionName", user);
    if(isAllowed){
        next();
    }
    else {
        res.status(403).send('You Shall Not Pass!');
    }
    
}

module.exports = { authMiddleware };