const { Post } = require('../models/post/post.model');
const { Like } = require('../models/post/like.model');
const { User } = require('../models/auth/user.model');

const createPost = async (req, res) => {
    const {} = req.body;

    res.send(200);
};

module.exports = { createPost };
