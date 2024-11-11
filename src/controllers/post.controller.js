const { Post } = require('../models/post/post.model');
const { Like } = require('../models/post/like.model');
const { getUser } = require('./user.controller');

const createPost = async (req, res) => {
    const { content, user_id } = req.body;

    try {
        const user = await getUser(user_id);

        if (user === 404) {
            res.status(404).send({
                status: 404,
                message: 'User not found',
            });
            return;
        }

        const post = await Post.create({
            content,
        });

        user.addPost(post.post_id);
        res.status(200).send({
            status: 200,
            message: 'Post created sucessfully!',
        });
    } catch (error) {
        console.log('error', error);
        res.status(500).send({
            status: 500,
            message: 'Internal Server Error!',
        });
    }
};

module.exports = { createPost };
