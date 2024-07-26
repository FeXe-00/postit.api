const { Model, DataTypes } = require('sequelize');
const { Like } = require('./like.model');

class Post extends Model {}

Post.init(
    {
        post_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        publication_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        publication_content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    },
    {
        tableName: 'posts',
        modelName: 'Posts',
        sequelize,
    },
    {
        timestamps: true,
        createdAt: true,
        updatedAt: true,
        sequelize,
    }
);

Post.hasMany(Like, {
    as: 'posts',
});

Like.belongsTo(Post, {
    as: 'likes',
    foreignKey: 'post_id',
});

module.exports = { Post };
