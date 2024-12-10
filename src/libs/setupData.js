const { Role } = require('../models');
const { Theme } = require('../models/post/theme.model');
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

async function createThemes() {
    try {
        const themes = await Theme.findAll();

        if (!themes.length) {
            await Theme.create({
                english_tag: 'technology',
                spanish_tag: 'tecnología',
            });
            await Theme.create({
                english_tag: 'science',
                spanish_tag: 'ciencia',
            });
            await Theme.create({
                english_tag: 'sports',
                spanish_tag: 'deportes',
            });
            await Theme.create({
                english_tag: 'politics',
                spanish_tag: 'política',
            });
            await Theme.create({
                english_tag: 'entertainment',
                spanish: 'entretenimiento',
            });
            return;
        }
    } catch (error) {
        console.log('error', error);
    }
}

module.exports = { createRoles, createThemes };
