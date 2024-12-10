const { Post } = require('../models/post/post.model');
const { Like } = require('../models/post/like.model');
const { getUser } = require('./user.controller');
const { statusResponse } = require('../helpers/response.helper');
const { Theme } = require('../models');

const getThemes = async (req, res) => {
    return {
        themes: [
            { spanish: 'tecnología', english: 'technology' },
            { spanish: 'arte', english: 'art' },
            { spanish: 'ciencia', english: 'science' },
            { spanish: 'política', english: 'politics' },
            { spanish: 'deportes', english: 'sports' },
            { spanish: 'cultura', english: 'culture' },
            { spanish: 'música', english: 'music' },
        ],
    };
};

const createTheme = async (req, res) => {
    const { spanish, english } = req.body;

    try {
        const theme = await Theme.create({
            spanish,
            english,
        });

        statusResponse(200, 'Theme created successfully!');
    } catch (error) {
        statusResponse(500, 'Internal Server Error!');
    }
};

const getPost = async (req, res) => {
    const { post_id } = req.params;

    try {
        const post = await Post.findByPk(post_id);

        if (!post) {
            statusResponse(404, 'Post not found!');
            return;
        }

        statusResponse(200, post);
    } catch (error) {
        statusResponse(500, 'Internal Server Error!');
    }
};

const createPost = async (req, res) => {
    const { content, user_id, post_themes } = req.body;

    try {
        const user = await getUser(user_id);

        if (user === 404) {
            statusResponse(404, 'User not found!');
            return;
        }

        const post = await Post.create({
            content,
        });

        user.addPost(post.post_id);

        statusResponse(200, 'Post created sucessfully!');
    } catch (error) {
        statusResponse(500, 'Internal Server Error!');
    }
};

module.exports = { createPost, getPost, getThemes, createTheme };
