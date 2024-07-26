const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../database/database');

class Like extends Model {}

Like.init(
    {
        like_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        value: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
    },
    {
        tableName: 'likes',
        modelName: 'Likes',
        sequelize,
    }
);

module.exports = { Like };
