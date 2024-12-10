const { User } = require('./auth/user.model');
const { Role } = require('./auth/role.model');
const { Permission } = require('./auth/permission.model');
const { RolePermission } = require('./auth/role_permission.model');
const { UserRole } = require('./auth/user_role.model');
const { Theme } = require('./post/theme.model');

module.exports = { User, Role, Permission, RolePermission, UserRole, Theme };
