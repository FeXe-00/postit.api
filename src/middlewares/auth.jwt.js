const { verify } = require('jsonwebtoken');
const { User } = require('../models');

const verifyToken = (req, res, next) => {
    try {
        const bearerToken = req.headers['authorization'];

        if (typeof bearerToken === 'undefined') {
            return res
                .status(403)
                .send({ status: 403, message: 'Access denied!' });
        }

        const token = bearerToken.split(' ')[1];

        const decoded = verify(token, process.env.JWT_SECRET);
        console.log('🚀 ~ verifyToken ~ decoded:', decoded);

        // const user = User.findByPk()

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
