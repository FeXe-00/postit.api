const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../database/database');
const { Permission } = require('./permission.model');

class Role extends Model {}

Role.init(
    {
        role_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role_description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        tableName: 'roles',
        sequelize,
    },
    {
        timestamps: true,
        createdAt: true,
        updatedAt: true,
        sequelize,
        modelName: 'Role',
    }
);

module.exports = { Role };
