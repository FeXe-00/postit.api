const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../database/database');

class UserRole extends Model {}

UserRole.init(
    {
        user_role_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
    },
    {
        tableName: 'users_roles',

        sequelize,
    },
    {
        timestamps: true,
        createdAt: true,
        updatedAt: true,
        sequelize,
        modelName: 'UserRole',
    }
);

module.exports = { UserRole };
