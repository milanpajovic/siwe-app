import { Router } from 'express';
import * as AuthController from '../controllers/auth.controller';
const router = Router();

router.get('/nonce', AuthController.getNonce);
router.get('/session', AuthController.getSession);
router.post('/verify', AuthController.verifySiwe);
router.get('/sign_out', AuthController.signOut);

/**
 * @swagger
 * /api/auth/nonce:
 *   get:
 *     summary: Get a random nonce
 *     description: Retrieves a random nonce for authentication purposes.
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: A random nonce.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 nonce:
 *                   type: string
 *                   example: "123456"
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/auth/session:
 *   get:
 *     summary: Get session information
 *     description: Retrieves session information if the user is authenticated. Returns a simple object if not authenticated.
 *     tags: [Auth]
 *     parameters:
 *       - in: cookie
 *         name: sessionId
 *         schema:
 *           type: string
 *         required: false
 *         description: Optional session ID for authentication.
 *     responses:
 *       200:
 *         description: Session information if authenticated, or a simple object indicating an unauthenticated state.
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - type: object
 *                   properties:
 *                     address:
 *                       type: string
 *                       example: "0x123..."
 *                     chainId:
 *                       type: integer
 *                       example: 1
 *                 - type: object
 *                   properties:
 *                     ok:
 *                       type: boolean
 *                       example: false
 */

/**
 * @swagger
 * /api/auth/verify:
 *   post:
 *     summary: Verify a signed message
 *     description: Verifies a message using the provided signature. Returns a success status if verification is successful.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - message
 *               - signature
 *             properties:
 *               message:
 *                 type: string
 *                 description: The message to be verified.
 *                 example: "Your message here"
 *               signature:
 *                 type: string
 *                 description: The signature of the message.
 *                 example: "0x45a...signature"
 *     responses:
 *       200:
 *         description: The result of the verification.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: true
 */

/**
 * @swagger
 * /api/auth/sign_out:
 *   get:
 *     summary: Sign out the user
 *     description: Signs out the user by destroying the session.
 *     tags: [Auth]
 *     parameters:
 *       - in: cookie
 *         name: sessionId
 *         schema:
 *           type: string
 *         required: true
 *         description: Session ID required to identify the user session to be destroyed.
 *     responses:
 *       200:
 *         description: Successfully signed out.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: true
 *       401:
 *         description: Unauthorized if the session ID is missing or invalid.
 */

export default router;
