const { User } = require('../models/auth/user.model');
const { Role } = require('../models/auth/role.model');
const { compareHash } = require('../utils/hash');
const { generateToken } = require('../libs/auth');

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
        // const userExixts = checkUserExistence(username);
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

        res.status(201).send({
            status: 201,
            message: 'User created successfully!',
            token: generateToken({
                user_id: user.user_id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                username: user.username,
                country: user.country,
            }),
        });
    } catch (error) {
        console.log('error', error);
        res.status(500).send({
            status: 500,
            message: 'Internal Server Error!',
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

        if (!user)
            return res.status(404).send({
                status: 404,
                message: 'User not found!',
            });

        const comparedPasswords = await compareHash(
            password,
            user.dataValues.password
        );

        if (!comparedPasswords)
            return res.status(401).send({
                status: 401,
                message: 'Wrong user or password!',
            });

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
        console.log('error', error);
        res.status(500).send({
            status: 500,
            message: 'Internal Server Error!',
        });
    }
};

module.exports = { signUp, signIn };
