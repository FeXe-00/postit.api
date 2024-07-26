const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../database/database');
const { hashValue } = require('../../utils/hash');
const { UserRole } = require('./user_role.model');
const { Post } = require('./../post/post.model');
const { Role } = require('./role.model');
const { Like } = require('../post/like.model');

class User extends Model {}

User.init(
    {
        user_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        country: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        birthdate: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        ocupation: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        roles: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false,
        },
    },
    {
        tableName: 'users',
        hooks: {
            beforeCreate: async (user, options) => {
                const hashedPassword = await hashValue(user.password);
                user.password = hashedPassword;
            },
        },
        sequelize,
    },
    {
        timestamps: true,
        createdAt: true,
        updatedAt: true,
        sequelize,
        modelName: 'User',
    }
);

/**
 * User_Role many to many association
 */

User.belongsToMany(Role, {
    as: 'users',
    through: UserRole,
    foreignKey: 'user_id',
    otherKey: 'role_id',
});

Role.belongsToMany(User, {
    as: 'roles',
    through: UserRole,
    foreignKey: 'role_id',
    otherKey: 'user_id',
});

/**
 * User_Post one to many association
 */

User.hasMany(Post);

Post.belongsTo(User, {
    foreignKey: 'user_id',
});

/**
 * User_Like one to many association
 */

User.hasMany(Like);

Like.belongsTo(User, {
    foreignKey: 'user_id',
});

module.exports = { User };
