import express from 'express';
import { registerUser } from '../controllers/auth.js';
router.post('/login', loginUser);

const router = express.Router();

router.post('/register', registerUser);

export default router;

