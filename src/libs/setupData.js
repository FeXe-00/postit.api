const { Role } = require('../models');

async function createRoles() {
    try {
        const roles = await Role.findAll();

        if (!roles.length) {
            await Role.create({
                role: 'admin',
                role_description:
                    'This role gives fully access to the API routes and actions.',
            });
            await Role.create({
                role: 'user',
                role_description:
                    'This role only gives access to the basic API blog actions and routes.',
            });
            return;
        }
    } catch (error) {
        console.log('error', error);
    }
}

module.exports = { createRoles };
