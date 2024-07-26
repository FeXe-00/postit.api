const jwt = require('jsonwebtoken');

const generateToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: 86400, // 24 hours
    });
};

const checkUserExistence = async (email) => {
    return await User.findOne({ where: { email: email } });
};

module.exports = { generateToken, checkUserExistence };
