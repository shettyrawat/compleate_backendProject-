import express from 'express';
import {
    startInterview,
    submitAnswer,
    getInterviews,
    startAdaptiveInterview,
    submitAdaptiveAnswer
} from '../controllers/interview.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

router.use(protect);

router.post('/start', startInterview);
router.post('/adaptive/start', startAdaptiveInterview);
router.post('/:id/answer', submitAnswer);
router.post('/adaptive/:id/step', submitAdaptiveAnswer);
router.get('/', getInterviews);

export default router;
