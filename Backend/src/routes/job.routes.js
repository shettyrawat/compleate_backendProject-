import express from 'express';
const router = express.Router();
import { getJobs, addJob, updateJob, deleteJob } from '../controllers/job.controller.js';
import { protect } from '../middleware/auth.middleware.js';

router.use(protect); // Protect all job routes

router.route('/')
    .get(getJobs)
    .post(addJob);

router.route('/:id')
    .put(updateJob)
    .delete(deleteJob);

export default router;
