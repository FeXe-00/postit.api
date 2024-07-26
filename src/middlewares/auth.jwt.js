const { verify } = require('jsonwebtoken');
const { User } = require('../models');

const verifyToken = async (req, res, next) => {
    try {
        const bearerToken = req.headers['authorization'];

        if (typeof bearerToken === 'undefined') {
            return res
                .status(403)
                .send({ status: 403, message: 'Access denied!' });
        }

        const token = bearerToken.split(' ')[1];
        const decoded = verify(token, process.env.JWT_SECRET);
        const user = await User.findByPk(decoded.user.user_id);

        if (user === null)
            res.status(404).send({
                status: 404,
                message: 'User not found!',
            });

        next();
    } catch (error) {
        console.log('error', error);
        res.status(500).send({
            status: 500,
            message: 'Internal server error!',
        });
    }
};

module.exports = { verifyToken };
