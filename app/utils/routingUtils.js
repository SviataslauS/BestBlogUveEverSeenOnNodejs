const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const oas3Tools = require('oas3-tools');
const YAML = require('yamljs');
const path = require('path');
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
            
            const options = {
                controllers: path.join(__dirname, '../controllers'),
            };
            app.use(middleware.swaggerRouter(options));
            
            app.get('/', (req, res) => {
                res.send('It\'s a Blog, motherfucker!');
            });
        });
    }
}


module.exports = { RoutingUtils };
