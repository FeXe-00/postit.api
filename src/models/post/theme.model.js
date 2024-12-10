const { Model, DataTypes } = require('sequelize');
const { Post } = require('./post.model');
const sequelize = require('../../database/database');

class Theme extends Model {}

Theme.init(
    {
        theme_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },

        english_tag: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        spanish_tag: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        tableName: 'themes',
        modelName: 'Themes',
        sequelize,
    },
    {
        timestamps: true,
        createdAt: true,
        updatedAt: true,
        sequelize,
    }
);

Post.hasMany(Theme, {
    as: 'themes',
});

Theme.belongsTo(Post, {
    as: 'themes',
    foreignKey: 'theme_id',
});

module.exports = { Theme };
