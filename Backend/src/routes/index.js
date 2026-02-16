import express from 'express';
import authRoutes from './auth.routes.js';
import jobRoutes from './job.routes.js';
import resumeRoutes from './resume.routes.js';
import interviewRoutes from './interview.routes.js';
import analyticsRoutes from './analytics.routes.js';
import chatbotRoutes from './chatbot.routes.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/jobs', jobRoutes);
router.use('/resumes', resumeRoutes);
router.use('/interviews', interviewRoutes);
router.use('/analytics', analyticsRoutes);
router.use('/chatbot', chatbotRoutes);

export default router;
