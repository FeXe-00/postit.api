const express = require('express');
const router = express.Router();
const {
    createPost,
    getThemes,
    createTheme,
    getPost,
} = require('../../controllers/post.controller');
const { verifyToken } = require('../../middlewares/auth.jwt');

router.get('/get-themes', verifyToken, getThemes);

router.post('/create-theme', verifyToken, createTheme);

router.get('/get-post', verifyToken, getPost);

router.post('/create-post', verifyToken, createPost);

module.exports = router;
