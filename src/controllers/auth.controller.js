const { User } = require('../models/auth/user.model');
const { Role } = require('../models/auth/role.model');
const jwt = require('jsonwebtoken');

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
        const userExists = await checkUserExistence(email);

        if (!!userExists) {
            res.status(409).send({
                status: 409,
                message: 'User already exists!',
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

        const userData = await User.findOne({ where: { username: username } });

        const {
            dataValues: { roles: userRoles },
        } = userData;

        if (userRoles.length > 1) {
            for (let role of userRoles) {
                const roles = await Role.findOne({ where: { role: role } });
                await user.addUser(roles?.dataValues?.role_id);
            }
        }

        if (userRoles.length === 1) {
            const role = await Role.findOne({
                where: { role: userRoles[0] },
            });
            await user.addUser(role?.dataValues?.role_id);
        }

        if (!userRoles.length) {
            const role = await Role.findOne({
                where: { role: 'user' },
            });
            await user.addUser(role?.dataValues?.role_id);
        }

        res.status(200).send({
            status: 200,
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
    const { email, password } = req;

    try {
    } catch (error) {}
};

const generateToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: 86400, // 24 hours
    });
};

const checkUserExistence = async (email) => {
    return await User.findOne({ where: { email: email } });
};

const loginUser = async () => {};

module.exports = { signUp, signIn };