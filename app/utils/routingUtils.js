const { HealthController } = require('../controllers/healthController');
const PostsController = require('../controllers/postController');
const { permissions } = require('../utils/enums');
// const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('../../swagger/swagger.yaml');
const { authMiddleware } = require('../middlewares/authMiddleware');
const cookieParser = require('cookie-parser');


class RoutingUtils {
    static registerMiddlewares(app){
        //app.use('/api', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
        app.use(cookieParser());
        app.use('*', authMiddleware);

    }

    static registerRoutes(app) {
        app.get(HealthController.paths.ping, HealthController.ping);
        
        app.post('/posts/getStatistic',  PostsController.getStatistic);
        
        app.get('/checkAuth', PostsController.getStatistic);
        
        app.get('/', (req, res) => {
            res.send('It\'s a Blog, motherfucker!');
        });
    }
}

module.exports = { RoutingUtils };
