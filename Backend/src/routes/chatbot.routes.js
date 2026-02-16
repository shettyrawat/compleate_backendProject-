import express from 'express';
import { chat } from '../controllers/chatbot.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/', protect, chat);

export default router;
