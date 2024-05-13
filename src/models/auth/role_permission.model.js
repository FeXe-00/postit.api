const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../database/database');
const { Permission } = require('./permission.model');
const { Role } = require('./role.model');

class RolePermission extends Model {}

RolePermission.init(
    {
        role_permission_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
    },
    {
        tableName: 'roles_permissions',
        sequelize,
    },
    {
        timestamps: true,
        createdAt: true,
        updatedAt: true,
        sequelize,
        modelName: 'RolePermission',
    }
);

Role.belongsToMany(Permission, {
    through: RolePermission,
    foreignKey: 'role_id',
});

Permission.belongsToMany(Role, {
    through: RolePermission,
    foreignKey: 'permission_id',
});

module.exports = { RolePermission };
