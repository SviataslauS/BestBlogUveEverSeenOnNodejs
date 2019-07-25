const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const oas3Tools = require('oas3-tools');
const YAML = require('yamljs');
const path = require('path');
const { HealthController } = require('../controllers/healthController');
const { LoginController } = require('../controllers/loginController');
const { authMiddleware } = require('../middlewares/authMiddleware');


const swaggerFilePath  = path.join(__dirname, '../../swagger/swagger.yaml');
const swaggerDocument = YAML.load(swaggerFilePath);

class RoutingUtils {
    static registerMiddlewares(app) {
        app.use('/api', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
        app.use(cookieParser());
        app.use(bodyParser.json());
        app.use('*', authMiddleware);
        
        oas3Tools.initializeMiddleware(swaggerDocument, (middleware) => {
            app.use(middleware.swaggerMetadata());
            
            var options = {
                controllers: path.join(__dirname, '../controllers'),
            };
            app.use(middleware.swaggerRouter(options));
        });

    }

    static registerRoutes(app) {
        app.get(HealthController.paths.ping, HealthController.ping);
        
        app.get(LoginController.paths.login, LoginController.login);
        app.get(LoginController.paths.logout, LoginController.logout);

        app.get('/', (req, res) => {
            res.send('It\'s a Blog, motherfucker!');
        });
    }
}


module.exports = { RoutingUtils };
