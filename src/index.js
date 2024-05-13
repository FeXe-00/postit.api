const express = require('express');
const logger = require('morgan');
const dotenv = require('dotenv');
const sequelize = require('./database/database');
const userRoute = require('./routes/user.routes');
const authRoute = require('./routes/auth.routes');
const { createRoles } = require('./libs/setupData');
require('./models');

const NODE_ENV = process.env.NODE_ENV || 'development';
dotenv.config({ path: `./.env.${NODE_ENV}` });

const app = express();
app.use(logger('dev'));
app.use(express.json());

// ========= ROUTES =========
app.get('/', (req, res) => {
    return res.send({ response: 'Welcome to Postit API!' });
});
// app.use('/api/v1/user', userRoute);
app.use('/api/v1/auth', authRoute);

const port = process.env.SERVER_PORT ?? 3000;

async function server() {
    try {
        await sequelize.sync({ force: false, alter: true });
        createRoles();
        app.listen(port, () => {
            console.log(`API started successfully!`);
            console.log(`Port opened: ${port}`);
            console.log(`Serving on: http://localhost:${port}`);
        });
    } catch (error) {
        console.error('Error al conectar con la base de datos:', error);
    }
}

server();
