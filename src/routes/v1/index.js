const authRoute = require('./auth.routes');
const postRotes = require('./post.routes');
const userRotes = require('./user.routes');
const swaggerDocs = require('./swagger');

module.exports = { authRoute, postRotes, userRotes };
