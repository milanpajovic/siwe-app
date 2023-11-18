import { Router, Request, Response } from 'express';
import * as AuthController from '../controllers/auth.controller';
const router = Router();

router.get('/nonce', AuthController.getNonce);
router.get('/session', AuthController.getSession);
router.post('/verify', AuthController.verifySiwe);
router.get('/sign_out', AuthController.signOut);


export default router;
