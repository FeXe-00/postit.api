const express = require('express');
const router = express.Router();
const { createPost } = require('../../controllers/post.controller');
const { verifyToken } = require('../../middlewares/auth.jwt');

router.post('/create-post', verifyToken, createPost);

module.exports = router;
