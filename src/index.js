const express = require('express');
const logger = require('morgan');
const dotenv = require('dotenv');
const sequelize = require('./database/database');
const helmet = require('helmet');
const { apiRouter } = require('./routes/api.router');
const { createRoles } = require('./libs/setupData');
const { swaggerDocs: V1SwaggerDocs } = require('./routes/v1/swagger');
require('./models');

const NODE_ENV = process.env.NODE_ENV || 'development';
dotenv.config({ path: `./.env.${NODE_ENV}` });

const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(helmet());

// ========= ROUTER =========
apiRouter(app);

const port = process.env.SERVER_PORT ?? 3000;

async function server() {
    try {
        await sequelize.sync({ force: false, alter: true });
        createRoles();
        app.listen(port, () => {
            V1SwaggerDocs(app, port);
            console.log(`API started successfully!`);
            console.log(`Port opened: ${port}`);
            console.log(`Serving on: http://localhost:${port}`);
        });
    } catch (error) {
        console.error('Error al conectar con la base de datos:', error);
    }
}

server();
