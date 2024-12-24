const express = require('express');
const router = express.Router();
const {
    createUser,
    getUsers,
    getUser,
} = require('../../controllers/user.controller');
const { verifyToken } = require('../../middlewares/auth.jwt');

router.post('/get-user', verifyToken, getUser);

module.exports = router;
