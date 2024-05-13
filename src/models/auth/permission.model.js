const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../database/database');

class Permission extends Model {}

Permission.init(
    {
        permission_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        user_permission_roles: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        tableName: 'permissions',
        sequelize,
    },
    {
        timestamps: true,
        createdAt: true,
        updatedAt: true,
        sequelize,
        modelName: 'Permission',
        tableName: 'permissions',
    }
);

module.exports = { Permission };
