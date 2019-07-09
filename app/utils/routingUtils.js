const HealthController = require('../controllers/healthController');
const PostsController = require('../controllers/postController');
const { Auth }  = require('../services/auth');
const { permissions } = require('../utils/enums');

permissions.VIEW_PHOTOS
class RoutingUtils {
    static registerRoutes(app) {
        app.get('/health/ping', HealthController.ping);
        
        app.post('/posts/getStatistic',  PostsController.getStatistic);
        
        app.get('/checkAuth', RoutingUtils.withPermissionVerification(PostsController.getStatistic, permissions.VIEW_PHOTOS));
        
        app.get('/', (req, res) => {
            res.send('It\'s a Blog, motherfucker!');
        });
    }

    static withPermissionVerification(apiAction, permissionName) {
        return function (req, res, next) {
            const user = { 'email': 'test@qwe.qwe'}; //getCurrentUser()
            const isAllowed = Auth.checkUserPermission(permissionName, user);
            if(isAllowed){
                apiAction(req, res, next);
            }
            else {
                res.status(403).send('You Shall Not Pass!');
            }

        }
    }
}

module.exports = { RoutingUtils };
