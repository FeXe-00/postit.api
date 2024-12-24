const { statusResponse } = require('../helpers/response.helper');
const { User } = require('../models/auth/user.model');

const getUsers = async () => {};

const getUser = async (req, res) => {
    const { user_id } = req.body;

    try {
        const user = await User.findByPk(user_id);

        if (!user) {
            statusResponse({
                res,
                status: 404,
                message: 'User not found!',
            });
        }

        statusResponse({
            res,
            status: 200,
            message: 'User found!',
            data: {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                username: user.username,
                country: user.country,
                birthday: user.birthday,
                createdAt: user.createdAt,
            },
        });
    } catch (error) {
        statusResponse({
            res,
            status: 500,
            message: 'Internal Server Error!',
            error: error,
        });
    }
};

module.exports = { getUser };
