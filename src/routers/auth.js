
import express from 'express';
import { registerUser, loginUser } from '../controllers/auth.js';
import { refreshToken } from '../controllers/refreshToken.js';
import { logoutUser } from '../controllers/logoutUser.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/refresh-token', refreshToken);
router.post('/logout', logoutUser);


export default router;

