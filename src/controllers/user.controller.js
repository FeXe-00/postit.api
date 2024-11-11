const { User } = require('../models/auth/user.model');

const getUsers = async () => {};

const getUser = async (user_id) => {
    try {
        const user = await User.findByPk(user_id);

        if (!user) {
            return 404;
        }

        return user;
    } catch (error) {
        console.log('error', error);
        res.status(500).send({
            status: 500,
            message: 'Internal Server Error!',
        });
    }
};

module.exports = { getUser };
