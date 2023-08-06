import express from 'express';
const router = express.Router();
import { login, signup, me, isseller } from '../controllers/UserController'
import { protect } from '../lib/middleware';

router.post('/login', login);
router.post('/signup', signup);
router.get('/me',protect, me);
router.get('/isseller', protect, isseller);

export default router;