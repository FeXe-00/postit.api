const { authRoute, postRotes, userRotes } = require('./v1');

const apiRouter = (app) => {
    app.get('/api/v1', (req, res) => {
        return res.send({ response: 'Welcome to Postit API!' });
    });

    app.use('/api/v1/auth', authRoute);
    app.use('/api/v1/post', postRotes);
    app.use('/api/v1/user', userRotes);
};

module.exports = { apiRouter };
