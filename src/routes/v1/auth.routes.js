const express = require('express');
const router = express.Router();
const { verifyToken } = require('../../middlewares/auth.jwt');
const { signUp, signIn } = require('../../controllers/auth.controller');

/**
 * @openapi
 * /api/v1/auth/sign-up:
 *   post:
 *     tags:
 *       - Sign-up
 *     responses:
 *       200:
 *         description: This endpoint executes user registration process, returns token and roles
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: User created successfully!
 *                 token:
 *                   type: string
 *                   example: auth_token
 *
 */
router.post('/sign-up', signUp);

/**
 * @openapi
 * /api/v1/auth/sign-in:
 *   post:
 *     tags:
 *       - Sign-in
 *     responses:
 *       200:
 *         description: This endpoint executes user login process, returns token and roles
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: User created successfully!
 *                 token:
 *                   type: string
 *                   example: auth_token
 *
 */
router.post('/sign-in', signIn);

router.patch('/update-data', verifyToken, (req, res) => {
    res.status(200).send({ message: 'Ok!' });
});

module.exports = router;
