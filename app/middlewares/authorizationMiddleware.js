const { Auth } = require('../services/authorizationService');


function withAuthorization(controller, actionName) {
    const action = controller[actionName];
    const permissionName = controller.permissions[actionName];
    if (!permissionName) {
        throw Error('Permission name must be in controller.permissions property by action name');
    }
    if (!action) {
        throw Error('Action name must available by controller[actionName]');
    }

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