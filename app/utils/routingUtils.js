const cookieParser = require('cookie-parser');
const express = require('express');
const { HealthController } = require('../controllers/healthController');
const PostsController = require('../controllers/postController');
const { LoginController } = require('../controllers/loginController');
const { withAuthorization } = require('../middlewares/authorizationMiddleware');
const { authMiddleware } = require('../middlewares/authMiddleware');
// const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('../../swagger/swagger.yaml');
// const cookieParser = require('cookie-parser');


class RoutingUtils {
    static registerMiddlewares(app) {
        app.use(express.static('/'));
        //app.use('/api', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
        app.use(cookieParser());
        app.use('*', authMiddleware);

    }

    static registerRoutes(app) {
        app.get(HealthController.paths.ping, HealthController.ping);
        
        app.get(LoginController.paths.login, LoginController.login);
        app.get(LoginController.paths.logout, LoginController.logout);

        app.post('/posts/getStatistic', withAuthorization(PostsController, 'getStatistic'));
        
        app.get('/checkAuth', PostsController.getStatistic);
        
        app.get('/', (req, res) => {
            res.send('It\'s a Blog, motherfucker!');
        });
    }
}


module.exports = { RoutingUtils };
