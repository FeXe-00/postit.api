const express = require('express');
const logger = require('morgan');
const dotenv = require('dotenv');
const sequelize = require('./database/database');
const helmet = require('helmet');
const methodOverride = require('method-override');
const { apiRouter } = require('./routes/api.router');
const { createRoles, createThemes } = require('./libs/setupData');
const { swaggerDocs: V1SwaggerDocs } = require('./routes/v1/swagger');
const { ExceptionHandler } = require('./helpers/exceptions.handler');
const e = require('express');

// ========= MODELS INJECTION =========
require('./models');

const NODE_ENV = process.env.NODE_ENV || 'development';
dotenv.config({ path: `./.env.${NODE_ENV}` });

const globalExceptionHandler = new ExceptionHandler();

const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(helmet());
app.use(methodOverride());

// ========= ROUTER =========
apiRouter(app);

// ========= GLOBAL EXCEPTION HANDLER =========
// app.use(function (req, res, next) {
//     globalExceptionHandler.appResponseControllers({ req, res });
//     globalExceptionHandler.setResponse("Route doesn't exist!");
//     next();
// });

const port = process.env.SERVER_PORT ?? 3000;

async function server() {
    try {
        await sequelize.sync({ force: false, alter: true });
        createRoles();
        // createThemes();
        app.listen(port, () => {
            V1SwaggerDocs(app, port);
            console.log(`API started successfully!`);
            console.log(`Port opened: ${port}`);
            console.log(`Serving on: http://localhost:${port}`);
        });
    } catch (error) {
        console.log('Error while trying to connect to the database:', error);
    }
}

server();
