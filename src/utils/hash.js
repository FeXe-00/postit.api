const { hash, compare, genSalt } = require('bcrypt');

async function hashValue(secret) {
    const salt = await genSalt(Number(process.env.BCRYPT_SALT));
    return await hash(secret, salt);
}

async function compareHash(secret, hash) {
    return await compare(secret, hash);
}

module.exports = { hashValue, compareHash };
