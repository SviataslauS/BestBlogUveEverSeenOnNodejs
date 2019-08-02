const { Auth } = require('../services/authorizationService');


function withAuthorization(action, permissionName) {
    return function authorizationMiddleware(req, res, next) {
        const user = { 'email': 'test@qwe.qwe'}; //getCurrentUser()        
        const isAllowed = Auth.checkUserPermission(permissionName, user);
        if(isAllowed){
            action(req, res, next);
        }
        else {
            res.status(403).send('You Shall Not Pass!');
        }

    };
}

module.exports = { withAuthorization };