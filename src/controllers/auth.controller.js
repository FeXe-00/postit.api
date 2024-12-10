const { User } = require('../models/auth/user.model');
const { Role } = require('../models/auth/role.model');
const { compareHash } = require('../utils/hash');
const { generateToken } = require('../libs/auth');
const { statusResponse } = require('../helpers/response.helper');

const signUp = async (req, res) => {
    const {
        firstName,
        lastName,
        country,
        birthdate,
        email,
        password,
        username,
        roles,
    } = req.body;

    try {
        const userExists = await User.findOne({
            where: { username: username },
        });

        if (userExists?.dataValues?.username === username) {
            res.status(400).send({
                status: 400,
                message: 'User already exists',
            });
            return;
        }

        const user = await User.create({
            firstName,
            lastName,
            country,
            birthdate,
            email,
            username,
            password,
            roles,
        });

        const {
            dataValues: { roles: userRoles },
        } = user;

        /**
         * This condition verifies if the data provided contains
         * more than one role, if that's the case, then
         * adds each role on every iteration
         */
        if (userRoles.length > 1) {
            for (let role of userRoles) {
                const roles = await Role.findOne({ where: { role: role } });
                await user.addUser(roles?.dataValues?.role_id);
            }
        }

        /**
         * If the client provides just one role, the following
         * condition adds it
         */
        if (userRoles.length === 1) {
            const role = await Role.findOne({
                where: { role: userRoles[0] },
            });
            await user.addUser(role?.dataValues?.role_id);
        }

        /**
         * If there's no role provided by the client, then
         * the role user' is assigned by default
         */
        if (!userRoles.length) {
            const role = await Role.findOne({
                where: { role: 'user' },
            });
            await user.addUser(role?.dataValues?.role_id);
        }

        statusResponse({
            status: 201,
            message: 'User created successfully!',
            data: {
                token: generateToken({
                    user_id: user.user_id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    username: user.username,
                    country: user.country,
                }),
            },
        });
    } catch (error) {
        statusResponse({
            status: 500,
            message: 'Internal Server Error!',
            error: error,
        });
    }
};

const signIn = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({
            attributes: [
                'user_id',
                'firstName',
                'lastName',
                'email',
                'country',
                'age',
                'roles',
                'password',
            ],
            where: { email: email },
            include: {
                model: Role,
                as: 'users',
            },
        });

        if (!user) {
            statusResponse({ status: 404, message: 'User not found!' });
            return;
        }

        const comparedPasswords = await compareHash(
            password,
            user.dataValues.password
        );

        if (!comparedPasswords) {
            statusResponse({
                status: 401,
                message: 'Wrong user or password!',
            });
            return;
        }

        return res.status(200).send({
            status: 200,
            message: 'User logged-in successfully!',
            token: generateToken({
                user: {
                    user_id: user.user_id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    country: user.country,
                    roles: user.roles,
                },
            }),
        });
    } catch (error) {
        statusResponse({
            status: 500,
            message: 'Internal Server Error!',
            error: error,
        });
    }
};

const signOut = async (req, res) => {
    const { user_id } = req.body;
};

module.exports = { signUp, signIn };
