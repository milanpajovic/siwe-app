import { Router } from 'express';
import * as ProfileController from '../controllers/profile.controller';
const router = Router();
/**
 * @swagger
 * /api/profile:
 *   get:
 *     summary: Retrieve user profile information
 *     description: Returns user profile data including name, location, contact phone, and email.
 *     tags: [UserProfile]
 *     parameters:
 *       - in: cookie
 *         name: sessionId
 *         schema:
 *           type: string
 *         required: true
 *         description: Session ID required for authentication
 *     responses:
 *       200:
 *         description: A user profile object.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   example: John Doe
 *                 profile:
 *                   type: object
 *                   properties:
 *                     location:
 *                       type: object
 *                       properties:
 *                         address:
 *                           type: string
 *                           example: 1234 Main St
 *                         postalCode:
 *                           type: string
 *                           example: "12345"
 *                         city:
 *                           type: string
 *                           example: Anytown
 *                     contactPhone:
 *                       type: string
 *                       example: '+1234567890'
 *                     email:
 *                       type: string
 *                       format: email
 *                       example: user@example.com
 *       401:
 *         description: Unauthorized if the session ID is missing or invalid.
 */
router.get('/', ProfileController.getProfile);
/**
 * @swagger
 * /api/profile:
 *   put:
 *     summary: Update user profile
 *     description: Updates the user's profile information.
 *     tags: [UserProfile]
 *     parameters:
 *       - in: cookie
 *         name: sessionId
 *         schema:
 *           type: string
 *         required: true
 *         description: Session ID required for authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Jane Doe
 *               profile:
 *                 type: object
 *                 properties:
 *                   location:
 *                     type: object
 *                     properties:
 *                       address:
 *                         type: string
 *                         example: 1234 Main St
 *                       postalCode:
 *                         type: string
 *                         example: "12345"
 *                       city:
 *                         type: string
 *                         example: Anytown
 *                   email:
 *                     type: string
 *                     format: email
 *                     example: jane@example.com
 *                   contactPhone:
 *                     type: string
 *                     example: '+1234567890'
 *     responses:
 *       200:
 *         description: Profile updated successfully.
 *       400:
 *         description: Bad request if the request body is invalid.
 *       401:
 *         description: Unauthorized if the session ID is missing or invalid.
 */
router.put('/', ProfileController.updateProfile);

export default router;
