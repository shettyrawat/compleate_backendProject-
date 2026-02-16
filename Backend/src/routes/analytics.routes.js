import express from 'express';
const router = express.Router();
import { getDashboardStats } from '../controllers/analytics.controller.js';
import { protect } from '../middleware/auth.middleware.js';

router.get('/dashboard', protect, getDashboardStats);

export default router;
