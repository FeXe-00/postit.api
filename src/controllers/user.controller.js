// const { User } = require('../models/User');
// const { hasher, compareHash } = require('../utils/hash');

// const signUp = async (req, res) => {
//     const { firstName, lastName, country, birthdate, email, password } =
//         req.body;

//     await User.create({
//         firstName,
//         lastName,
//         country,
//         birthdate,
//         email,
//         password: password,
//     });
//     res.send({ status: 200, message: 'User created successfully!' });
// };

// const signIn = async (req, res) => {
//     const users = await User.findAll();
//     res.send(users);
// };

// module.exports = { signUp, signIn };
