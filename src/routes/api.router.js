const { authRoute, postRotes } = require('./v1');

const apiRouter = (app) => {
    app.get('/api/v1', (req, res) => {
        return res.send({ response: 'Welcome to Postit API!' });
    });

    app.use('/api/v1/auth', authRoute);
    app.use('/api/v1/post', postRotes);
};

module.exports = { apiRouter };
