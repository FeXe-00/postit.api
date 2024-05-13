const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares/auth.jwt');
const { signUp, signIn } = require('../controllers/auth.controller');

router.post('/sign-up', signUp);

router.post('/sign-in', signIn);

router.patch('/update-data', verifyToken, (req, res) => {
    res.status(200).send({ message: 'Ok!' });
});

module.exports = router;
