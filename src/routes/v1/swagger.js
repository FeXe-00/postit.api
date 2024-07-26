// In src/v1/swagger.js
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Basic Meta Informations about our API
const options = {
    definition: {
        openapi: '3.0.0',
        info: { title: 'Postit Blog API', version: '1.0.0' },
    },
    servers: [
        {
            url: `http://localhost:${process.env.SERVER_PORT}`,
            description: 'Servidor de desarrollo',
        },
    ],
    apis: ['./src/routes/v1/auth.routes.js', './src/database/database.js'],
};

// Docs in JSON format
const swaggerSpec = swaggerJSDoc(options);

// Function to setup our docs
const swaggerDocs = (app, port) => {
    app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    app.get('/api/v1/docs.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });
    console.log(
        `Version 1 Docs are available on http://localhost:${port}/api/v1/docs`
    );
};

module.exports = { swaggerDocs };
